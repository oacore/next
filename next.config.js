const path = require('path')

const withImages = require('next-images')

const nextConfig = {
  env: {
    GA_CODE: process.env.GA_CODE,
  },
  webpack: (config) => {
    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()

      if (entries['main.js'] && !entries['main.js'].includes('./polyfills.js'))
        entries['main.js'].unshift('./polyfills.js')

      return entries
    }

    const { rules } = config.module
    // TODO: Remove once https://github.com/zeit/next.js/issues/10584 is solved and released
    // Find the array of "style rules" in the webpack config.
    // This is the array of webpack rules that:
    // - is inside a 'oneOf' block
    // - contains a rule that matches 'file.css'
    const styleRules = (
      rules.find(
        (m) => m.oneOf && m.oneOf.find(({ test: reg }) => reg.test('file.scss'))
      ) || {}
    ).oneOf
    if (!styleRules) return config
    // Find all the webpack rules that handle CSS modules
    // Look for rules that match '.module.css'
    // but aren't being used to generate
    // error messages.
    const cssModuleRules = [
      styleRules.find(
        ({ test: reg, use }) =>
          reg.test('file.module.scss') && use.loader !== 'error-loader'
      ),
    ].filter((n) => n) // remove 'undefined' values
    // Add the 'localsConvention' config option to the CSS loader config
    // in each of these rules.
    cssModuleRules.forEach((cmr) => {
      // Find the item inside the 'use' list that defines css-loader
      const cssLoaderConfig = cmr.use.find(({ loader }) =>
        loader.includes('css-loader')
      )
      if (cssLoaderConfig && cssLoaderConfig.options) {
        // Patch it with the new config
        cssLoaderConfig.options.modules.exportLocalsConvention = 'camelCase'
      }
    })

    Object.assign(config.resolve.alias, {
      components: path.resolve(__dirname, 'components'),
      data: path.resolve(__dirname, 'data'),
    })

    config.module.rules.push(
      {
        test: /\.ya?ml$/,
        include: [path.resolve(__dirname, 'data')],
        use: [
          'json-loader',
          path.resolve('webpack/data-loader.js'),
          {
            loader: 'yaml-import-loader',
            options: {
              output: 'json',
              importRawKeyword: 'file',
            },
          },
        ],
      },
      {
        test: /\.ya?ml$/,
        exclude: [path.resolve(__dirname, 'data')],
        use: {
          loader: 'yaml-import-loader',
          options: {
            importNested: false,
          },
        },
      },
      {
        test: /\.md$/,
        use: ['json-loader', 'yaml-frontmatter-loader'],
      }
    )

    Object.assign(config.resolve.alias, {
      main: path.join(__dirname, 'main'),
    })
    return config
  },

  trailingSlash: true,
}

module.exports = withImages(nextConfig)
