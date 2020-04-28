import React from 'react'

import { AccessReviewLink } from '../AccessReviewLink'
import { WhyAccess } from './WhyAccess'

import './index.css'

const FAQ = () => {
  return (
    <div className="faq">
      {process.env.REACT_APP_DIRECT_TOKEN ? null : <div className="qaPair">
        <p className="question bold">How do I revoke the access I've granted for this app?</p>
        <p className="answer">You can <AccessReviewLink noLinkStyle={false} >review the access rights on GitHub.</AccessReviewLink></p>
      </div>}
      {process.env.REACT_APP_DIRECT_TOKEN ? null : <WhyAccess />}
      <div className="qaPair">
        <p className="question bold">Why can I only view 100 results at a time?</p>
        <p className="answer">
          The decision to display and filter each set invidually, as it becomes avaiable, is a reflection of GitHub's API structure.
        </p>
        <p className="answer">
          GitHub's search API limits the number of result nodes that can be retrieved with one request to 100. It does provide the total number of results, but it provides the cursors to request the previous and next sets only. This means it's possible to infer from the first set of results how many sets (or pages) of 100 there will be, but impossible to request any set that isn't immediately preceding or succeding the current.
        </p>
      </div>
    </div>
  )
}

export {
  FAQ
}
