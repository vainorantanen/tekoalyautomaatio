const router = require('express').Router()
const ProjectPost = require('../models/projectPost')
const Offer = require('../models/offer')

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const projectPosts = await ProjectPost
    .find({})
    .populate('user', { name: 1 })
    .populate({ path: 'offers' })
  response.json(projectPosts)
})

router.post('/', userExtractor, async (request, response) => {
  //console.log("RBODY", request.body)
  const { description, timeStamp, title } = request.body
  //console.log("aINFO", additionalinfo)
  const projectPost = new ProjectPost({
    description,
    timeStamp,
    title
  })

  const user = request.user

  if (!user || user.isDeveloper === true) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  projectPost.user = user._id

  let createdprojectPost = await projectPost.save()

  user.projectPosts = user.projectPosts.concat(createdprojectPost._id)
  await user.save()

  createdprojectPost = await ProjectPost.findById(createdprojectPost._id).populate('user')

  response.status(201).json(createdprojectPost)
})

router.put('/:id', async (request, response) => {
  const { description, isOpen } = request.body

  let updatedprojectPost = await ProjectPost.findByIdAndUpdate(request.params.id,  { description, isOpen }, { new: true })

  updatedprojectPost = await ProjectPost.findById(updatedprojectPost._id).populate('user')

  response.json(updatedprojectPost)
})

router.delete('/:id', userExtractor, async (request, response) => {
  const post = await ProjectPost.findById(request.params.id)

  const user = request.user

  if (!user || post.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  user.projectPosts = user.projectPosts.filter(b => b.toString() !== post.id.toString() )

  await user.save()
  await post.remove()

  response.status(204).end()
})

router.post('/:id/offers', userExtractor, async (request, response) => {
  const { description, timeStamp, isApproved } = request.body

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  const projectPost = await ProjectPost.findById(request.params.id)

  const offerToAdd = new Offer({
    description,
    timeStamp,
    isApproved
  })

  offerToAdd.user = user._id

  await offerToAdd.save()

  projectPost.offers = projectPost.offers.concat(offerToAdd._id)
  let updatedprojectPost = await projectPost.save()

  user.offers = user.offers.concat(offerToAdd._id)
  await user.save()

  updatedprojectPost = await ProjectPost.findById(projectPost.id).populate('user').populate({ path: 'offers' })
  console.log('up', updatedprojectPost)
  response.status(201).json(updatedprojectPost)

})

module.exports = router