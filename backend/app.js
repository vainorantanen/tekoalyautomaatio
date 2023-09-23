const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
require('express-async-errors')
const path = require('path')

const contactRouter = require('./controllers/contact')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const projectPostRouter = require('./controllers/projectPosts')
const devsPostsRouter = require('./controllers/devsPosts')
const feedPostsRouter = require('./controllers/feedPosts')
const commentsRouter = require('./controllers/comments')
const portalPostsRouter = require('./controllers/portalPosts')
const chatsRouter = require('./controllers/chats')
const ratingsRouter = require('./controllers/ratings')
const forgotPasswordRouter = require('./controllers/forgotpassword')
const resetPassWordRouter = require('./controllers/resetpassword')
const sitemapRouter = require('./controllers/sitemap')
const blogsRouter = require('./controllers/blogs')
const customerSupportRouter = require('./controllers/customersupport')
const ordersRouter = require('./controllers/orders')


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
app.use('/api/devsposts', devsPostsRouter)
app.use('/api/feedposts', feedPostsRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/portalposts', portalPostsRouter)
app.use('/api/chats', chatsRouter)
app.use('/api/ratings', ratingsRouter)
app.use('/api/forgot-password', forgotPasswordRouter)
app.use('/api/reset-password', resetPassWordRouter)
app.use('/sitemap.xml', sitemapRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/customersupport', customerSupportRouter)
app.use('/api/orders', ordersRouter)

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
