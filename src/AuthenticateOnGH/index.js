import React from 'react'
import { v4 as uuid4 } from 'uuid'

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
    <div className="authenticateOnGH">
      <div className="authenticateCard card">
        <h2>Welcome</h2>
        <a href={authorizationUri}>Please login with GitHub to continue.</a>
      </div>
    </div>
  )
}

export {
  AuthenticateOnGH
}
