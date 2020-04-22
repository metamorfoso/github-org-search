import React from 'react'

import './index.css'

import openInNewSvg from './open_in_new-24px.svg'

const urlToReadable = (url) => {
  const splitUrl = url.split('//')

  if (splitUrl.length < 2) {
    return url
  }

  return splitUrl[1]
}

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

const OpenInNewIcon = () => {
  return (
    <img className="openInNewIcon" src={openInNewSvg} alt="open_in_new--icon" />
  )
}

const Organization = (props) => {
  const { name, avatarUrl, description, location, url, websiteUrl } = props

  return (
    <div className="org">
      <OpenInNew url={url}>
        <img className="avatarImg" src={avatarUrl} alt="organization avatar" />
      </OpenInNew>
      <div className="info1">
        <p className="primary name"><OpenInNew url={url}>{name} <OpenInNewIcon /></OpenInNew></p>
        <p className="secondary description">{description || "[no description]"}</p>
      </div>
      <div className="info2">
        <p className="secondary website">{websiteUrl ? <OpenInNew url={websiteUrl}>{urlToReadable(websiteUrl)} <OpenInNewIcon /></OpenInNew> : "[no website]"}</p>
        <p className="secondary location">{location || "[no location]"}</p>
      </div>
    </div>
  )
}

export {
  Organization
}
