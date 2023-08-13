const router = require('express').Router()
const FeedPostComment = require('../models/comment')
const FeedPost = require('../models/feedPost')

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const feedPostComments = await FeedPostComment
    .find({})
    .populate('user', { name: 1 })
  response.json(feedPostComments)
})

router.post('/', userExtractor, async (request, response) => {
  //console.log("RBODY", request.body)
  const { comment, targetId } = request.body
  console.log('body', comment, targetId)
  //console.log("aINFO", additionalinfo)
  const feedPostComment = new FeedPostComment({
    content: comment,
    timeStamp: new Date()
  })

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  feedPostComment.user = user._id

  let createdComment = await feedPostComment.save()

  user.comments = user.comments.concat(createdComment._id)
  await user.save()

  const targetPost = await FeedPost.findById(targetId)
  targetPost.comments = targetPost.comments.concat(createdComment._id)

  await targetPost.save()

  createdComment = await FeedPostComment.findById(createdComment._id).populate('user')

  response.status(201).json(createdComment)
})


module.exports = router