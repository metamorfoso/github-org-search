require('dotenv').config()

const path = require('path')
const express = require('express')
const uuid4 = require('uuid').v4

const {
  APP_URL,
  SERVER_URL,
  SERVER_PORT,
  CLIENT_ID,
  CLIENT_SECRET
} = require('./config')

const credentials = {
  client: {
    id: CLIENT_ID,
    secret: CLIENT_SECRET
  },
  auth: {
    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token',
    authorizePath: '/login/oauth/authorize'
  }
}

const handleAuth = (authorizationUri) => (_, res) => {
  res.redirect(authorizationUri)
}

const handleAuthCallback = (oauth2, startingState) => async (req, res) => {
  const { code, state } = req.query

  if (state !== startingState) {
    console.error(`Rejecting: Returned state did not match starting state, respectively: \n ${state}\n${startingState}`)
    return res.status(500).json('Authentication failed')
  }

  try {
    const token = await oauth2.authorizationCode.getToken({ code })

    return res.redirect(`${APP_URL}?token=${token.access_token}`)
  } catch (error) {
    console.error('Failed to get access token:', error.message)
    return res.status(500).json('Authentication failed')
  }
}

const handleRoot = (_, res) => {
  return res.sendFile(path.join(__dirname, 'build', 'html.index'))
}

const server = () => {
  const app = express()

  const oauth2 = require('simple-oauth2').create(credentials)

  const state = uuid4()

  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: `${SERVER_URL}:${SERVER_PORT}/authCallback`,
    scope: 'read:org',
    state
  })

  if (process.env.NODE_ENV !== 'development') {
    app.use(express.static(path.join(__dirname, 'build')))
    app.get('/', handleRoot)
  }

  app.get('/auth', handleAuth(authorizationUri))
  app.get('/authCallback', handleAuthCallback(oauth2, state))

  app.listen(SERVER_PORT, () => console.log(`Authentication server listening on port ${SERVER_PORT}`))
}

server()
