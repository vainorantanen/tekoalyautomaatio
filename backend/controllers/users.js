const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

router.post('/', async (request, response) => {
  try {
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
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.get('/', userExtractor, async (request, response) => {

  const user = request.user
  let users

  if (!user) {
    // Show only users with isDeveloper === true
    console.log('1')
    users = await User.find({ isDeveloper: { $ne: true } })
      .populate({ path: 'projectPosts' })
      .populate({ path: 'feedPosts' })
      .populate({ path: 'offers' })
  } else if (user.username === 'admin') {
    // Find all users
    console.log('admin')
    users = await User.find({})
      .populate({ path: 'projectPosts' })
      .populate({ path: 'feedPosts' })
      .populate({ path: 'offers' })
  } else if (!user.isDeveloper) {
    // Find the user himself and all users with isDeveloper === true
    console.log('ei devaaja')
    users = await User.find({ $or: [{ _id: user._id }, { isDeveloper: true }] })
      .populate({ path: 'projectPosts' })
      .populate({ path: 'feedPosts' })
      .populate({ path: 'offers' })
  } else if (user.isDeveloper) {
    // Show only users with isDeveloper === true
    console.log('devaaja')
    users = await User.find({ isDeveloper: true })
      .populate({ path: 'projectPosts' })
      .populate({ path: 'feedPosts' })
      .populate({ path: 'offers' })
  } else {
    console.log('muutoin')
    users = []
  }
  response.json(users)
})


router.put('/:id', userExtractor, async (request, response) => {
  try {
    const { description, email } = request.body

    const user = request.user

    const wantedUser = await User.findById(request.params.id)

    if (!user || !(wantedUser.id.toString() !== user.id.toString() || user.username !== 'admin')) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    let updatedUser = await User.findByIdAndUpdate(request.params.id,  { description, email }, { new: true })

    updatedUser = await User.findById(updatedUser._id)

    response.json(updatedUser)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.put('/:id/disable', userExtractor, async (request, response) => {
  try {
    const { disabled } = request.body

    const user = request.user

    // vain admin voi muuttaa disabled/enabled tilaa
    if (!user || user.username !== 'admin') {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    let updatedUser = await User.findByIdAndUpdate(request.params.id,  { disabled }, { new: true })

    updatedUser = await User.findById(updatedUser._id)

    response.json(updatedUser)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

module.exports = router