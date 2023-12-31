const router = require('express').Router()
const DevsPost = require('../models/devsPost')

const { userExtractor, isUserDisabled } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const devsPosts = await DevsPost
    .find({})
    .populate('user', { name: 1 })
  response.json(devsPosts)
})

router.post('/', userExtractor, async (request, response) => {
  try {
    const { description, title, price, postType, time, location } = request.body
    const devsPost = new DevsPost({
      description,
      timeStamp: new Date(),
      title,
      price,
      postType,
      time,
      location
    })

    const user = request.user
    const checkIfUserDisabled = await isUserDisabled(user)

    if (!user || user.isDeveloper === false || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    devsPost.user = user._id

    let createdDevsPost = await devsPost.save()

    user.devsPosts = user.devsPosts.concat(createdDevsPost._id)
    await user.save()

    createdDevsPost = await DevsPost.findById(createdDevsPost._id).populate('user')

    response.status(201).json(createdDevsPost)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.put('/:id', userExtractor, async (request, response) => {
  try {
    const { description, title, price, location, time, isOpen } = request.body

    const user = request.user

    const devPost = await DevsPost.findById(request.params.id)

    if (!user || devPost.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    let updatedDevsPost = await DevsPost.findByIdAndUpdate(request.params.id,  { description, isOpen, title, price, location, time, }, { new: true })

    updatedDevsPost = await DevsPost.findById(updatedDevsPost._id).populate('user')

    response.json(updatedDevsPost)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.delete('/:id', userExtractor, async (request, response) => {
  try {
    const post = await DevsPost.findById(request.params.id)

    const user = request.user

    if (!user || post.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    user.devsPosts = user.devsPosts.filter(b => b.toString() !== post.id.toString() )

    await user.save()
    await post.remove()

    response.status(204).end()
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

module.exports = router