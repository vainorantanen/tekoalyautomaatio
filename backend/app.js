const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
require('express-async-errors')

const contactRouter = require('./controllers/contact')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const projectPostRouter = require('./controllers/projectPosts')

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/contacts', contactRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/projectposts', projectPostRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
