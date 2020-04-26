const fetch = require('node-fetch')

const  { Encoding, encodingModeEnum } = require('simple-oauth2/lib/request-options/encoding')

const {
  URL: APP_URL, // netlify injects this automatically
  REACT_APP_CLIENT_ID,
  CLIENT_SECRET
} = process.env

exports.handler = async (event) => {
  console.log('Running /authCallback handler...')
  const { code, state } = event.queryStringParameters

  console.log({ REACT_APP_CLIENT_ID })
  console.log({ CLIENT_SECRET: CLIENT_SECRET != null ? 'exists...' : 'does not exit' })
  console.log({ code })
  console.log({ state })

  try {
    const body = `grant_type=authorization_code&code=${code}`

    const encoding = new Encoding(encodingModeEnum.STRICT)

    const credentials = encoding.getAuthorizationHeaderToken(REACT_APP_CLIENT_ID, CLIENT_SECRET)

    const fetchResponse = await fetch('https://github.com/login/oauth/access_token', {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': body.length
      },
      method: 'POST',
      body
    })

    const resJson = await fetchResponse.json()

    console.log({ resJson })

    const { access_token } = resJson

    if (!access_token) {
      throw new Error(`Failed to find access_token in response from Github: ${JSON.stringify(resJson)}`)
    }

    return {
      statusCode: 301,
      headers: {
        Location: `${APP_URL}?access_token=${access_token}`
      },
      body: ''
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: 'Something went wrong with the oauth flow.'
    }
  }
}
