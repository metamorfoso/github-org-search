const fetch = require('node-fetch')

const {
  URL: APP_URL, // netlify injects this automatically
  REACT_APP_CLIENT_ID,
  CLIENT_SECRET
} = process.env

exports.handler = async (event) => {
  const { code, state } = event.queryStringParameters

  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      body: JSON.stringify({
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        state,
        redirect_uri: APP_URL
      })
    })

    const resJson = await res.json()

    console.log({resJson})

    const { access_token } = resJson

    return {
      statusCode: 301,
      headers: {
        Location: `${APP_URL}?access_token=${access_token}`
      },
      body: ''
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error.message
    }
  }
}
