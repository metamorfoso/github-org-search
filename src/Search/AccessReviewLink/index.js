import React from 'react'

import { OpenInNew } from '../../components/ExtrenalLink/OpenInNew'
import { OpenInNewIcon } from '../../components/ExtrenalLink/OpenInNewIcon'

import './index.css'

const githubAccessReviewUrl = `https://github.com/settings/connections/applications/${process.env.REACT_APP_CLIENT_ID}`

const AccessReviewLink = () => {
  return (
    <div className="githubAccessReview card">
      <OpenInNew url={githubAccessReviewUrl}>Review this app's privileges on Github<OpenInNewIcon /></OpenInNew>
    </div>
  )
}

export {
  AccessReviewLink
}
