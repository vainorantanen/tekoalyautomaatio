const router = require('express').Router()
const FeedPost = require('../models/feedPost')

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const feedPosts = await FeedPost
    .find({})
    .populate('user', { name: 1 })
  response.json(feedPosts)
})

router.post('/', userExtractor, async (request, response) => {
  //console.log("RBODY", request.body)
  const { description, timeStamp, title } = request.body
  //console.log("aINFO", additionalinfo)
  const feedPost = new FeedPost({
    description,
    timeStamp,
    title,
    comments: [],
    likes: []
  })

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  feedPost.user = user._id

  let createdFeedPost = await feedPost.save()

  user.feedPosts = user.feedPosts.concat(createdFeedPost._id)
  await user.save()

  createdFeedPost = await FeedPost.findById(createdFeedPost._id).populate('user')

  response.status(201).json(createdFeedPost)
})

router.put('/:id', async (request, response) => {
  const { description } = request.body

  let updatedFeedPost = await FeedPost.findByIdAndUpdate(request.params.id,  { description }, { new: true })

  updatedFeedPost = await FeedPost.findById(updatedFeedPost._id).populate('user')

  response.json(updatedFeedPost)
})

router.delete('/:id', userExtractor, async (request, response) => {
  const post = await FeedPost.findById(request.params.id)

  const user = request.user

  if (!user || post.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  user.feedPosts = user.feedPosts.filter(b => b.toString() !== post.id.toString() )

  await user.save()
  await post.remove()

  response.status(204).end()
})

module.exports = router