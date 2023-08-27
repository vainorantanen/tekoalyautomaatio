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

  // Ei voi antaa itselleen arvosteluja
  if (!user || user._id === targetUser._id) {
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

router.delete('/:id', userExtractor, async (request, response) => {

  const ratingId = request.params.id
  const rating = await Rating.findById(ratingId)

  const userThatGaveRating = await User.findById(rating.user)

  const user = request.user

  if (!user || !userThatGaveRating || !(rating.user.toString() === user.id.toString() || rating.targetUser.toString() === user.id.toString())) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  user.ratings = user.ratings.filter(b => b.toString() !== rating.id.toString() )

  await user.save()

  userThatGaveRating.givenRatings = userThatGaveRating.givenRatings.filter(b => b.toString() !== rating.id.toString())
  await userThatGaveRating.save()

  await rating.remove()

  response.status(204).end()
})

router.put('/:id', userExtractor, async (request, response) => {
  const { showOnDevProfile } = request.body

  const user = request.user

  // käyttäjän tulee olla sama kuin postauksen lisännyt käyttäjä

  const rating = await Rating.findById(request.params.id)

  if (!user || rating.targetUser.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  let updatedRating = await Rating.findByIdAndUpdate(request.params.id,  { showOnDevProfile }, { new: true })

  updatedRating = await Rating.findById(updatedRating._id).populate('user').populate('targetUser')

  response.json(updatedRating)
})


module.exports = router