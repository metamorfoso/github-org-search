import fetch from 'node-fetch'

const {
  URL: APP_URL, // netlify injects this automatically
  REACT_APP_CLIENT_ID,
  CLIENT_SECRET
} = process.env

exports.handler = async (event) => {
  const { code, state } = event.queryStringParameters

  try {
    await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      body: JSON.stringify({
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        state,
        redirect_uri: APP_URL
      })
    })

    return {
      statusCode: 200
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error.message
    }
  }
}
