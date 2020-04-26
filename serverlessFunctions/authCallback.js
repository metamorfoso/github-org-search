const fetch = require('node-fetch')
const FormData = require('form-data')

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
    const form = new FormData()
    form.append('grant_type', 'authorization_code')
    form.append('code', code)

    const encoding = new Encoding(encodingModeEnum.STRICT)

    const credentials = encoding.getAuthorizationHeaderToken(REACT_APP_CLIENT_ID, CLIENT_SECRET)

    const res = await fetch('https://github.com/login/oauth/access_token', {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: form
    })

    const resJson = await res.json()

    console.log({resJson})

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
