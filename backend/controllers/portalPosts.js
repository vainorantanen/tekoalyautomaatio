const router = require('express').Router()
const PortalPost = require('../models/portalPost')
const PortalBid = require('../models/portalbid')

const { userExtractor, isUserDisabled } = require('../utils/middleware')

router.get('/', userExtractor, async (request, response) => {
  const user = request.user
  if (!user) {
    response.json([])
  } else {
    // jos kyseessä on firma, joka maksaa, niin näytetään kaikki
    if (user.isDeveloper) {
      const portalPosts = await PortalPost
        .find({})
        .populate('user', { name: 1 })
      response.json(portalPosts)
    } else {
      // muulloin vain käyttäjän itsensä tekemät postaukset
      const portalPosts = await PortalPost
        .find({ user: user._id.toString() })
        .populate('user', { name: 1 })
      response.json(portalPosts)
    }
  }
})

router.post('/', userExtractor, async (request, response) => {
  try {
    const { description, title } = request.body

    const portalPost = new PortalPost({
      description,
      title,
      isOpen: true,
      timeStamp: new Date(),
      offers: []
    })

    const user = request.user

    if (!user || user.isDeveloper === true) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    portalPost.user = user._id

    let createdportalPost = await portalPost.save()

    user.portalPosts = user.portalPosts.concat(createdportalPost._id)
    await user.save()

    createdportalPost = await PortalPost.findById(createdportalPost._id).populate('user', { name: 1 })

    response.status(201).json(createdportalPost)
  }  catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.put('/:id', userExtractor, async (request, response) => {
  try {
    const { description, isOpen, question4, other, minPrice, maxPrice } = request.body

    const user = request.user
    // käyttäjän tulee olla sama kuin postauksen lisännyt käyttäjä

    const portalPost = await PortalPost.findById(request.params.id)

    const checkIfUserDisabled = await isUserDisabled(user)

    if (!user || portalPost.user.toString() !== user.id.toString()
    || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    let updatedportalPost = await PortalPost.findByIdAndUpdate(request.params.id,  { description, isOpen,
      question4, other, minPrice, maxPrice }, { new: true })

    updatedportalPost = await PortalPost.findById(updatedportalPost._id)
      .populate('user', { name: 1 }).populate({ path: 'portalBids' })

    response.json(updatedportalPost)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})
router.delete('/:id', userExtractor, async (request, response) => {
  try {
    const post = await PortalPost.findById(request.params.id)

    const user = request.user

    if (!user || post.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    user.portalPosts = user.portalPosts.filter(b => b.toString() !== post.id.toString() )

    await user.save()

    await PortalBid.deleteMany({ targetPost: request.params.id })

    await post.remove()

    response.status(204).end()
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

module.exports = router