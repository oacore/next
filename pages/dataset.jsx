import React from 'react'
import { Article, Button, Markdown, HighlightSection } from 'components'
import { patchStats } from 'components/utils'

import datasetData from 'data/dataset.yml'

// TODO: Fix temporal text-center class usage
const DataSetPage = () => (
  <Article>
    <div className="text-center">
      <h1>{datasetData.title}</h1>
      <Markdown>{datasetData.subtitle}</Markdown>
    </div>

    {datasetData.sections.map(({ title, content, link, image }) => (
      <HighlightSection image={image} action={link.url} key={title}>
        <h3>
          <Markdown>{patchStats(title, datasetData.statistics)}</Markdown>
        </h3>
        <Markdown>{patchStats(content, datasetData.statistics)}</Markdown>
        <Button
          outline
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
        >
          {link.caption}
        </Button>
      </HighlightSection>
    ))}
  </Article>
)
export default DataSetPage
