import React from 'react'
import { v4 as uuid4 } from 'uuid'

import { DownwardModal } from '../components/DownwardModal'
import { WhyAccess } from '../FAQ/WhyAccess'

import './index.css'

const URL = process.env.REACT_APP_URL
const AUTHCALLBACK_PATH = process.env.REACT_APP_AUTHCALLBACK_PATH
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

const state = uuid4()
const redirect_uri = `${URL}${AUTHCALLBACK_PATH}`

const authorizationUri = process.env.NODE_ENV === 'development'
  ? 'http://127.0.0.1:4000/auth'
  : `https://github.com/login/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&scope=read%3Aorg&state=${state}`

const AuthenticateOnGH = () => {
  return (
    <div className="container">
      <div className="authenticate card">
        <h2 className="welcomeHeading">Welcome</h2>
        <a className="authLink" href={authorizationUri}>Please login with GitHub to continue.</a>
        <DownwardModal heading={'Why?'}>
          <div className="whyAccessWrapper">
            <WhyAccess />
            <p className="reassurance bold">You will be able to review and revoke access at any point.</p>
          </div>
        </DownwardModal>
      </div>
    </div>
  )
}

export {
  AuthenticateOnGH
}
