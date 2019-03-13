import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import Link from './link'

/* eslint-disable jsx-a11y/anchor-is-valid */

// We pass additional link because Markdown component does not render
// pure text but renders own TextRenderer componet instead
const MarkdownLink = ({ href, title, children }) => {
  const [pathname, hash] = href.split('#')
  return (
    <Link href={{ pathname, hash: hash && `#${hash}` }} passHref>
      <a title={title}>{children}</a>
    </Link>
  )
}

const markdownConfig = {
  escapeHtml: false,

  renderers: {
    blockquote: ({ children }) => (
      <blockquote className="blockquote">{children}</blockquote>
    ),

    table: ({ children }) => (
      <table className="table table-hover">{children}</table>
    ),

    link: MarkdownLink,
    linkReference: MarkdownLink,
  },
}

const Markdown = ({ children, tag, ...markdownProps }) => (
  <ReactMarkdown {...markdownConfig} {...markdownProps} root={tag}>
    {children}
  </ReactMarkdown>
)

export default Markdown