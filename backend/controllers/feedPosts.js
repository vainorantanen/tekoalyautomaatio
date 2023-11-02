const router = require('express').Router()
const FeedPost = require('../models/feedPost')
const FeedPostComment = require('../models/comment')

const { userExtractor, isUserDisabled } = require('../utils/middleware')

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
  try {
    const { description, timeStamp } = request.body

    const feedPost = new FeedPost({
      description,
      timeStamp,
      comments: [],
      likes: []
    })

    const user = request.user
    const checkIfUserDisabled = await isUserDisabled(user)

    if (!user || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    feedPost.user = user._id

    let createdFeedPost = await feedPost.save()

    user.feedPosts = user.feedPosts.concat(createdFeedPost._id)
    await user.save()

    createdFeedPost = await FeedPost.findById(createdFeedPost._id).populate('user')

    response.status(201).json(createdFeedPost)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.put('/:id', userExtractor, async (request, response) => {
  try {
    const { description } = request.body

    const user = request.user
    const checkIfUserDisabled = await isUserDisabled(user)

    // käyttäjän tulee olla sama kuin postauksen lisännyt käyttäjä

    const feedPost = await FeedPost.findById(request.params.id)

    if (!user || feedPost.user.toString() !== user.id.toString()
  || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    let updatedFeedPost = await FeedPost.findByIdAndUpdate(request.params.id,  { description }, { new: true })

    updatedFeedPost = await FeedPost.findById(updatedFeedPost._id).populate('user').populate({ path: 'comments' })

    response.json(updatedFeedPost)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.put('/:id/markInappropriate', userExtractor, async (request, response) => {
  // kuka vaan voi ilmoittaa ilmoituksen epäasialliseksi
  try {
    const { inAppropriateClicks } = request.body

    let updatedFeedPost = await FeedPost.findByIdAndUpdate(request.params.id,  { inAppropriateClicks }, { new: true })

    updatedFeedPost = await FeedPost.findById(updatedFeedPost._id).populate('user').populate({ path: 'comments' })

    response.json(updatedFeedPost)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.delete('/:id', userExtractor, async (request, response) => {

  try {
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
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.post('/:id/comments', userExtractor, async (request, response) => {

  try {
    const { comment } = request.body

    const user = request.user
    const checkIfUserDisabled = await isUserDisabled(user)

    if (!user || checkIfUserDisabled === true) {
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
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }

})

router.post('/:id/likes', userExtractor, async (request, response) => {
  try {
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
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }

})

router.delete('/:id/likes', userExtractor, async (request, response) => {
  try {
    const user = request.user

    const feedPost = await FeedPost.findById(request.params.id)

    if (!user || !feedPost.likes.includes(user.id)) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    feedPost.likes = feedPost.likes.filter(l => l._id.toString() !== user._id.toString())
    let updatedFeedPost = await feedPost.save()

    updatedFeedPost = await FeedPost.findById(feedPost.id).populate('user').populate({ path: 'comments' })
    response.status(201).json(updatedFeedPost)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.delete('/:id/comments/:cid', userExtractor, async (request, response) => {
  try {
    const feedPost = await FeedPost.findById(request.params.id)
    const user = request.user
    const commentId = request.params.cid

    const commentToDelete = await FeedPostComment.findById(commentId)

    if (!user || !(commentToDelete.user.toString() === user._id.toString() || user._id.toString() === feedPost.user.toString())) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    await commentToDelete.remove()

    feedPost.comments = feedPost.comments.filter(c => c._id.toString() !== commentId)
    let updatedFeedPost = await feedPost.save()

    updatedFeedPost = await FeedPost.findById(feedPost.id).populate('user').populate({ path: 'comments' })
    response.status(201).json(updatedFeedPost)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

module.exports = router