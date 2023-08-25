const router = require('express').Router()
const PortalPost = require('../models/portalPost')
const Offer = require('../models/offer')

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const portalPosts = await PortalPost
    .find({})
    .populate('user', { name: 1 })
    .populate({ path: 'offers' })
  response.json(portalPosts)
})

router.post('/', userExtractor, async (request, response) => {

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

  createdportalPost = await PortalPost.findById(createdportalPost._id).populate('user')

  response.status(201).json(createdportalPost)
})

router.put('/:id', userExtractor, async (request, response) => {
  const { description, isOpen } = request.body

  const user = request.user

  // käyttäjän tulee olla sama kuin postauksen lisännyt käyttäjä

  const portalPost = await PortalPost.findById(request.params.id)

  if (!user || portalPost.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  let updatedportalPost = await PortalPost.findByIdAndUpdate(request.params.id,  { description, isOpen }, { new: true })

  updatedportalPost = await PortalPost.findById(updatedportalPost._id).populate('user').populate({ path: 'offers' })

  response.json(updatedportalPost)
})

router.put('/:id/offerAccept/:oid', userExtractor, async (request, response) => {

  const user = request.user

  const portalPostId = request.params.id
  const offerId = request.params.oid

  const portalPost = await PortalPost.findById(portalPostId)

  // vain portalPostin lisännyt käyttäjä voi hyväksyä tarjouksen
  if (!user || portalPost.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  // Update the isApproved field of the specified offer
  const updatedOffer = await Offer.findByIdAndUpdate(offerId, { isApproved: true }, { new: true })
  // Find the portalPost and update its offers array with the updated offer

  const updatedOffersArray = portalPost.offers.map(offer =>
    offer._id.equals(updatedOffer._id) ? updatedOffer : offer
  )

  const updatedportalPost = await PortalPost.findByIdAndUpdate(
    portalPostId,
    { offers: updatedOffersArray },
    { new: true }
  ).populate('user').populate({ path: 'offers' })

  response.json(updatedportalPost)
})

router.delete('/:id', userExtractor, async (request, response) => {
  const post = await PortalPost.findById(request.params.id)

  const user = request.user

  if (!user || post.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  user.portalPosts = user.portalPosts.filter(b => b.toString() !== post.id.toString() )

  await user.save()

  await Offer.deleteMany({ targetPost: request.params.id })

  await post.remove()

  response.status(204).end()
})

router.post('/:id/offers', userExtractor, async (request, response) => {
  const { description } = request.body

  const user = request.user

  if (!user || user.isDeveloper === false) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  const portalPost = await PortalPost.findById(request.params.id)

  const offerToAdd = new Offer({
    description,
    timeStamp: new Date(),
    isApproved: false,
    offeror: user.name,
    targetPost: portalPost._id
  })

  offerToAdd.user = user._id

  await offerToAdd.save()

  portalPost.offers = portalPost.offers.concat(offerToAdd._id)
  let updatedportalPost = await portalPost.save()

  user.offers = user.offers.concat(offerToAdd._id)
  await user.save()

  updatedportalPost = await PortalPost.findById(portalPost.id).populate('user').populate({ path: 'offers' })
  response.status(201).json(updatedportalPost)

})

router.delete('/:id/offers/:oid', userExtractor, async (request, response) => {
  const portalPost = await PortalPost.findById(request.params.id)
  const user = request.user
  const offerId = request.params.oid

  const offerToDelete = await Offer.findById(offerId)

  if (!user || !(offerToDelete.user.toString() === user._id.toString() || user._id.toString() === portalPost.user.toString())) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  await offerToDelete.remove()

  user.offers = user.offers.filter(c => c._id.toString() !== offerId)
  await user.save()
  portalPost.offers = portalPost.offers.filter(c => c._id.toString() !== offerId)
  let updatedportalPost = await portalPost.save()

  updatedportalPost = await PortalPost.findById(portalPost.id).populate('user').populate({ path: 'offers' })
  response.status(201).json(updatedportalPost)

})

module.exports = router