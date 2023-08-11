const router = require('express').Router()
const DevsPost = require('../models/devsPost')

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const devsPosts = await DevsPost
    .find({})
    .populate('user', { name: 1 })
  response.json(devsPosts)
})

router.post('/', userExtractor, async (request, response) => {
  const { description, timeStamp, title } = request.body
  const devsPost = new DevsPost({
    description,
    timeStamp,
    title
  })

  const user = request.user

  if (!user || user.isDeveloper === false) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  devsPost.user = user._id

  let createdDevsPost = await devsPost.save()

  user.devsPosts = user.devsPosts.concat(createdDevsPost._id)
  await user.save()

  createdDevsPost = await DevsPost.findById(createdDevsPost._id).populate('user')

  response.status(201).json(createdDevsPost)
})

router.put('/:id', async (request, response) => {
  const { description, isOpen } = request.body

  let updatedDevsPost = await DevsPost.findByIdAndUpdate(request.params.id,  { description, isOpen }, { new: true })

  updatedDevsPost = await DevsPost.findById(updatedDevsPost._id).populate('user')

  response.json(updatedDevsPost)
})

router.delete('/:id', userExtractor, async (request, response) => {
  const post = await DevsPost.findById(request.params.id)

  const user = request.user

  if (!user || post.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  user.devsPosts = user.devsPosts.filter(b => b.toString() !== post.id.toString() )

  await user.save()
  await post.remove()

  response.status(204).end()
})

module.exports = router