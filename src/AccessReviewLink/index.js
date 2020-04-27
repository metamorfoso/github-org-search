import React from 'react'

import { OpenInNew } from '../components/ExtrenalLink/OpenInNew'
import { OpenInNewIcon } from '../components/ExtrenalLink/OpenInNewIcon'

const githubAccessReviewUrl = `https://github.com/settings/connections/applications/${process.env.REACT_APP_CLIENT_ID}`

const AccessReviewLink = ({ noLinkStyle = true, children }) => {
  return <OpenInNew noLinkStyle={noLinkStyle} url={githubAccessReviewUrl}>{children}<OpenInNewIcon /></OpenInNew>
}

export {
  AccessReviewLink
}
