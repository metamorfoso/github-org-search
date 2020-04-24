const {
  APP_URL,
  SERVER_URL,
  SERVER_PORT,
} = (function (NODE_ENV) {
  let APP_URL, SERVER_PORT, SERVER_URL

  switch(NODE_ENV) {
    case 'development':
      APP_URL = process.env.APP_URL || 'http://127.0.0.1:3000'
      SERVER_URL = process.env.SERVER_URL || 'http://127.0.0.1'
      SERVER_PORT = process.env.SERVER_PORT || 4000
      break
    case 'production':
    default:
      APP_URL = process.env.APP_URL
      SERVER_URL = process.env.SERVER_URL || 'http://127.0.0.1'
      SERVER_PORT = process.env.SERVER_PORT || 4000
      break
  }

  return {
    APP_URL,
    SERVER_URL,
    SERVER_PORT,
  }
})(process.env.NODE_ENV)

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

module.exports = {
  APP_URL,
  SERVER_URL,
  SERVER_PORT,
  CLIENT_ID,
  CLIENT_SECRET
}
