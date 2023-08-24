const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

router.post('/', async (request, response) => {
  const { username, name, password, isDeveloper, description, email } = request.body

  if ( !password || password.length < 3) {
    return response.status(400).json({
      error: '`password` is shorter than the minimum allowed length (3)'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
    isDeveloper,
    description,
    email
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

router.get('/', async (request, response) => {
  const users = await User.find({})
    .populate({ path: 'projectPosts' })
    .populate({ path: 'feedPosts' })
    .populate({ path: 'offers' })
  response.json(users)
})


router.put('/:id', userExtractor, async (request, response) => {
  const { description, email } = request.body

  const user = request.user

  const wantedUser = await User.findById(request.params.id)

  if (!user || wantedUser.id.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  let updatedUser = await User.findByIdAndUpdate(request.params.id,  { description, email }, { new: true })

  updatedUser = await User.findById(updatedUser._id)

  response.json(updatedUser)
})

module.exports = router