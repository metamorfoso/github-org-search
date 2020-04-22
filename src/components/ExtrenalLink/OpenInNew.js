import React from 'react'

const OpenInNew = ({ url, children, noLinkStyle = true }) => {
  return (
    <a
      className={noLinkStyle ? "noDefaultLinkStyle" : null}
      target="_blank"
      href={url}
      rel="noopener noreferrer"
     >{children}</a>
  )
}

export {
  OpenInNew
}
