import React from 'react'

const URL = process.env.URL // netlify will inject this automatically
const AUTHCALLBACK_PATH = process.env.REACT_APP_AUTHCALLBACK_PATH
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

const redirect_uri = `${URL}${AUTHCALLBACK_PATH}`

const authorizationUri = process.env.NODE_ENV === 'development'
  ? 'http://127.0.0.1:4000/auth'
  : `https://github.com/login/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&scope=read%3Aorg&state=${state}`

const AuthenticateOnGH = () => {
  return (
    <div>
      <a href={authorizationUri}>Please login with Github to continue.</a>
    </div>
  )
}

export {
  AuthenticateOnGH
}
