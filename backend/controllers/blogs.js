const router = require('express').Router()
const Blog = require('../models/blog')

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { name: 1 })
  response.json(blogs)
})

router.post('/', userExtractor, async (request, response) => {
  const { description, title } = request.body
  const blog = new Blog({
    description,
    timeStamp: new Date(),
    title
  })

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  blog.user = user._id

  let createdblog = await blog.save()

  user.blogs = user.blogs.concat(createdblog._id)
  await user.save()

  createdblog = await Blog.findById(createdblog._id).populate('user')

  response.status(201).json(createdblog)
})

router.put('/:id', userExtractor, async (request, response) => {
  const { description, title } = request.body

  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (!user || blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  let updatedblog = await Blog.findByIdAndUpdate(request.params.id,  { description, title }, { new: true })

  updatedblog = await Blog.findById(updatedblog._id).populate('user')

  response.json(updatedblog)
})

router.put('/:id/markInappropriate', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  let updatedblog = await Blog.findByIdAndUpdate(request.params.id,  { inAppropriateClicks: blog.inAppropriateClicks+1 }, { new: true })

  updatedblog = await Blog.findById(updatedblog._id).populate('user')

  response.json(updatedblog)
})

router.delete('/:id', userExtractor, async (request, response) => {
  const post = await Blog.findById(request.params.id)

  const user = request.user

  if (!user || post.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  user.blogs = user.blogs.filter(b => b.toString() !== post.id.toString() )

  await user.save()
  await post.remove()

  response.status(204).end()
})

module.exports = router