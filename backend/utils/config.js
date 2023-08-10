require('dotenv').config()

const PORT = process.env.PORT || 3001
const MONGODB_URI =
  process.env.NODE_ENV === 'development'
    ? process.env.MONGODB_DEV_URI
    : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
}