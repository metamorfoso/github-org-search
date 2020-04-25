const fetch = require('node-fetch')

const {
  URL: APP_URL, // netlify injects this automatically
  REACT_APP_CLIENT_ID,
  CLIENT_SECRET
} = process.env

exports.handler = async (event) => {
  const { code, state } = event.queryStringParameters

  console.log({ REACT_APP_CLIENT_ID })
  console.log({ CLIENT_SECRET: CLIENT_SECRET != null ? 'exists...' : 'does not exit' })
  console.log({ code })
  console.log({ state })

  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code
      })
    })

    const resJson = await res.json()

    console.log({resJson})

    const { access_token } = resJson

    if (!access_token) {
      throw new Error(`Failed to find access_token in response from Github: ${resJson}`)
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
