const router = require('express').Router()
const Blog = require('../models/blog')

const { userExtractor, isUserDisabled } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { name: 1 })
  response.json(blogs)
})

router.post('/', userExtractor, async (request, response) => {
  try {
    const { description, title } = request.body
    const blog = new Blog({
      description,
      timeStamp: new Date(),
      title
    })

    const user = request.user
    const checkIfUserDisabled = await isUserDisabled(user)

    if (!user ||checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    blog.user = user._id

    let createdblog = await blog.save()

    user.blogs = user.blogs.concat(createdblog._id)
    await user.save()

    createdblog = await Blog.findById(createdblog._id).populate('user')

    response.status(201).json(createdblog)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.put('/:id', userExtractor, async (request, response) => {
  try {
    const { description, title } = request.body

    const user = request.user

    const blog = await Blog.findById(request.params.id)
    const checkIfUserDisabled = await isUserDisabled(user)

    if (!user || blog.user.toString() !== user.id.toString() ||
    checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    let updatedblog = await Blog.findByIdAndUpdate(request.params.id,  { description, title }, { new: true })

    updatedblog = await Blog.findById(updatedblog._id).populate('user')

    response.json(updatedblog)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.put('/:id/markInappropriate', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)

    let updatedblog = await Blog.findByIdAndUpdate(request.params.id,  { inAppropriateClicks: blog.inAppropriateClicks+1 }, { new: true })

    updatedblog = await Blog.findById(updatedblog._id).populate('user')

    response.json(updatedblog)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.delete('/:id', userExtractor, async (request, response) => {
  try {
    const post = await Blog.findById(request.params.id)

    const user = request.user

    if (!user || post.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    user.blogs = user.blogs.filter(b => b.toString() !== post.id.toString() )

    await user.save()
    await post.remove()

    response.status(204).end()
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

module.exports = router