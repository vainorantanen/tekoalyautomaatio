const router = require('express').Router()
const CustomerSupportPost = require('../models/customerSupportPost')

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const customerSupportPosts = await CustomerSupportPost
    .find({})
    .populate('user', { name: 1 })
  response.json(customerSupportPosts)
})

router.post('/', userExtractor, async (request, response) => {
  const { description, title, email } = request.body
  const customerSupportPost = new CustomerSupportPost({
    description,
    timeStamp: new Date(),
    title,
    email
  })

  const user = request.user
  // kuka vain voi ottaa yhteyden aspaan
  if (user) {
    customerSupportPost.user = user._id
  }

  let createdcustomerSupportPost = await customerSupportPost.save()

  createdcustomerSupportPost = await CustomerSupportPost.findById(createdcustomerSupportPost._id).populate('user')

  response.status(201).json(createdcustomerSupportPost)
})

router.put('/:id', userExtractor, async (request, response) => {
  const { isOpen } = request.body

  const user = request.user

  const post = await CustomerSupportPost.findById(request.params.id)

  // vain admin tai pyynnön lisännyt käyttäjä voi muokata
  if (!user || !(post.user.toString() === user.id.toString() || user.username === 'admin')) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  let updatedcustomerSupportPost = await CustomerSupportPost.findByIdAndUpdate(request.params.id,  { isOpen }, { new: true })

  updatedcustomerSupportPost = await CustomerSupportPost.findById(updatedcustomerSupportPost._id).populate('user')

  response.json(updatedcustomerSupportPost)
})

router.delete('/:id', userExtractor, async (request, response) => {
  const post = await CustomerSupportPost.findById(request.params.id)

  const user = request.user

  if (!user || !(post.user.toString() === user.id.toString() || user.username === 'admin')) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  await post.remove()

  response.status(204).end()
})

module.exports = router