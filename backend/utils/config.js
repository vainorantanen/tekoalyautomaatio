require('dotenv').config()

const PORT = process.env.PORT || 3001

let MONGODB_URI

console.log(process.env.MONGODB_TEST_URI, PORT)

if (process.env.NODE_ENV === 'test') {
  console.log('running on test')
  MONGODB_URI = process.env.MONGODB_TEST_URI
} else if (process.env.NODE_ENV === 'development') {
  console.log('running on dev')
  MONGODB_URI = process.env.MONGODB_DEV_URI
} else {
  console.log('running on prod')
  MONGODB_URI = process.env.MONGODB_URI
}

console.log(MONGODB_URI)

module.exports = {
  MONGODB_URI,
  PORT,
}