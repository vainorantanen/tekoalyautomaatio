const router = require('express').Router()
const FeedPost = require('../models/feedPost')
const FeedPostComment = require('../models/comment')

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const feedPosts = await FeedPost
    .find({})
    .populate('user', { name: 1 })
    .populate({
      path: 'comments',
    })

  response.json(feedPosts)
})

router.post('/', userExtractor, async (request, response) => {
  //console.log("RBODY", request.body)
  const { description, timeStamp } = request.body
  //console.log("aINFO", additionalinfo)
  const feedPost = new FeedPost({
    description,
    timeStamp,
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

  updatedFeedPost = await FeedPost.findById(updatedFeedPost._id).populate('user').populate({ path: 'comments' })

  response.json(updatedFeedPost)
})

router.delete('/:id', userExtractor, async (request, response) => {

  const postId = request.params.id
  const post = await FeedPost.findById(postId)


  const user = request.user

  if (!user || post.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  // poistetaan käyttäjän feedposteista kyseinen feedpost

  user.feedPosts = user.feedPosts.filter(b => b.toString() !== post.id.toString() )

  await user.save()

  // Remove related comments for the post
  await FeedPostComment.deleteMany({ targetPost: postId })

  await post.remove()

  response.status(204).end()
})

router.post('/:id/comments', userExtractor, async (request, response) => {
  const { comment } = request.body

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  const feedPost = await FeedPost.findById(request.params.id)

  const commentToAdd = new FeedPostComment({
    content: comment,
    timeStamp: new Date(),
    commentorName: user.name,
    targetPost: feedPost._id
  })

  commentToAdd.user = user._id

  await commentToAdd.save()

  feedPost.comments = feedPost.comments.concat(commentToAdd._id)
  let updatedFeedPost = await feedPost.save()

  updatedFeedPost = await FeedPost.findById(feedPost.id).populate('user').populate({ path: 'comments' })
  response.status(201).json(updatedFeedPost)

})

router.post('/:id/likes', userExtractor, async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  const feedPost = await FeedPost.findById(request.params.id)

  // implement here that if feedPost.likes contains user.id.toString() then return error
  if (feedPost.likes.includes(user._id.toString())) {
    return response.status(400).json({ error: 'You have already liked this post' })
  }

  feedPost.likes = feedPost.likes.concat(user._id)
  let updatedFeedPost = await feedPost.save()

  updatedFeedPost = await FeedPost.findById(feedPost.id).populate('user').populate({ path: 'comments' })
  response.status(201).json(updatedFeedPost)

})

router.delete('/:id/comments/:cid', userExtractor, async (request, response) => {
  const feedPost = await FeedPost.findById(request.params.id)
  const user = request.user
  const commentId = request.params.cid

  const commentToDelete = await FeedPostComment.findById(commentId)

  if (!user || !(commentToDelete.user.toString() === user._id.toString() || user._id.toString() === feedPost.user.toString())) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  await commentToDelete.remove()

  feedPost.comments = feedPost.comments.filter(c => c.id !== commentId)
  let updatedFeedPost = await feedPost.save()

  updatedFeedPost = await FeedPost.findById(feedPost.id).populate('user').populate({ path: 'comments' })
  response.status(201).json(updatedFeedPost)

})

module.exports = router