const router = require('express').Router()
const FeedPostComment = require('../models/comment')

router.get('/', async (request, response) => {
  const feedPostComments = await FeedPostComment
    .find({})
    .populate('user', { name: 1 })
  response.json(feedPostComments)
})


module.exports = router