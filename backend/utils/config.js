require('dotenv').config()

const PORT = process.env.PORT || 3001

let MONGODB_URI

console.log(process.env.MONGODB_TEST_URI, PORT)

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config()
  MONGODB_URI = process.env.MONGODB_TEST_URI
} else if (process.env.NODE_ENV === 'development') {
  MONGODB_URI = process.env.MONGODB_DEV_URI
} else {
  MONGODB_URI = process.env.MONGODB_URI
}

console.log(MONGODB_URI)

module.exports = {
  MONGODB_URI,
  PORT,
}