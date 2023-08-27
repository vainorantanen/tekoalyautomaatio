const router = require('express').Router()
const Rating = require('../models/rating')
const User = require('../models/user')

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const ratings = await Rating
    .find({})
    .populate('user', { name: 1 })
    .populate('targetUser', { name: 1 })
  response.json(ratings)
})

router.post('/', userExtractor, async (request, response) => {

  const { description, targetUserId, score } = request.body

  const targetUser = await User.findById(targetUserId)

  const rating = new Rating({
    description,
    timeStamp: new Date(),
    targetUser: targetUser._id,
    score,
    showOnDevProfile: false
  })

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  rating.user = user._id

  let createdRating = await rating.save()

  user.givenRatings = user.givenRatings.concat(createdRating._id)
  await user.save()

  targetUser.ratings = targetUser.ratings.concat(createdRating._id)
  await targetUser.save()

  createdRating = await Rating.findById(createdRating._id).populate('user').populate('targetUser')

  response.status(201).json(createdRating)
})


module.exports = router