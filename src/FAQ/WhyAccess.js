import React from 'react'

import { OpenInNew } from '../components/ExtrenalLink/OpenInNew'
import { OpenInNewIcon } from '../components/ExtrenalLink/OpenInNewIcon'

const githubScopeLink = process.env.GH_SCOPES_URL || 'https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/#available-scopes'

const ScopesLink = ({ children }) => <OpenInNew noLinkStyle={false} url={githubScopeLink}>{children}<OpenInNewIcon /></OpenInNew>

const WhyAccess = () => (
  <div className="qaPair">
    <p className="question bold">Why am I being asked for access to info on organizations I belong to on GitHub?</p>
    <p className="answer">
      This is part of the permissions granted by the <span className="bold">read:org</span> scope from GitHub. It's the <ScopesLink>narrowest of available scopes for OAuth tokens</ScopesLink> that allow token holders to search GitHub for organizations.
        </p>
    <p className="answer">
      Unfortunately, tokens obtained with a <span className="bold">(no scopes)</span> parameter are not authorized to search for organizations.
        </p>
        <p className="answer">
          It seems to me GitHub conflates 1) searching other organizations with 2) access to public info of organization the user themselves belongs to, under the same privilege.
        </p>
    <p className="answer">
      <p classNam="answer">
        It's perhaps an oversight, but it's a limitation I've had to work with.
        </p>
    </p>
  </div>
)

export {
  WhyAccess
}
