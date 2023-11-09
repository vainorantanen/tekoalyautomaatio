const router = require('express').Router()
const ProjectPost = require('../models/projectPost')
const Offer = require('../models/offer')

const { userExtractor, isUserDisabled } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const projectPosts = await ProjectPost
    .find({})
    .populate('user', { name: 1 })
    .populate({ path: 'offers' })
  response.json(projectPosts)
})

router.post('/', userExtractor, async (request, response) => {

  try {
    const { description, other, question1, question1Other, question2,
      question2Other, question3, question4, date, minPrice, maxPrice } = request.body

    const today = new Date()

    if (date < today) {
      return response.status(400).json({ error: 'date wrong' })
    }

    const projectPost = new ProjectPost({
      description,
      timeStamp: today,
      question1,
      question2,
      question3,
      question4,
      dueDate: date,
      other,
      minPrice,
      maxPrice
    })

    if (question1 === 'other') {
      projectPost.question1 = question1Other
    }

    if (question2 === 'other') {
      projectPost.question2 = question2Other
    }

    if (question1 === 'other') {
      projectPost.question1 = question1Other
    }

    if (question2 === 'other') {
      projectPost.question2 = question2Other
    }


    const user = request.user
    const checkIfUserDisabled = isUserDisabled(user)

    if (!user || user.isDeveloper === true || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    projectPost.user = user._id

    let createdprojectPost = await projectPost.save()

    user.projectPosts = user.projectPosts.concat(createdprojectPost._id)
    await user.save()

    createdprojectPost = await ProjectPost.findById(createdprojectPost._id).populate('user')

    response.status(201).json(createdprojectPost)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.put('/:id', userExtractor, async (request, response) => {
  try {
    const { description, isOpen } = request.body

    const user = request.user

    // käyttäjän tulee olla sama kuin postauksen lisännyt käyttäjä

    const projectPost = await ProjectPost.findById(request.params.id)

    if (!user || projectPost.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    let updatedprojectPost = await ProjectPost.findByIdAndUpdate(request.params.id,  { description, isOpen }, { new: true })

    updatedprojectPost = await ProjectPost.findById(updatedprojectPost._id).populate('user').populate({ path: 'offers' })

    response.json(updatedprojectPost)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.put('/:id/offerAccept/:oid', userExtractor, async (request, response) => {

  try {
    const user = request.user

    const projectPostId = request.params.id
    const offerId = request.params.oid

    const projectPost = await ProjectPost.findById(projectPostId)

    // vain projectPostin lisännyt käyttäjä voi hyväksyä tarjouksen
    if (!user || projectPost.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    // Update the isApproved field of the specified offer
    const updatedOffer = await Offer.findByIdAndUpdate(offerId, { isApproved: true }, { new: true })
    // Find the projectPost and update its offers array with the updated offer

    const updatedOffersArray = projectPost.offers.map(offer =>
      offer._id.equals(updatedOffer._id) ? updatedOffer : offer
    )

    const updatedprojectPost = await ProjectPost.findByIdAndUpdate(
      projectPostId,
      { offers: updatedOffersArray },
      { new: true }
    ).populate('user').populate({ path: 'offers' })

    response.json(updatedprojectPost)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.delete('/:id', userExtractor, async (request, response) => {
  try {
    const post = await ProjectPost.findById(request.params.id)

    const user = request.user

    if (!user || post.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    user.projectPosts = user.projectPosts.filter(b => b.toString() !== post.id.toString() )

    await user.save()

    await Offer.deleteMany({ targetPost: request.params.id })

    await post.remove()

    response.status(204).end()
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.post('/:id/offers', userExtractor, async (request, response) => {
  try {
    const { description } = request.body

    const user = request.user
    const checkIfUserDisabled = isUserDisabled(user)

    if (!user || user.isDeveloper === false || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    const projectPost = await ProjectPost.findById(request.params.id)

    const offerToAdd = new Offer({
      description,
      timeStamp: new Date(),
      isApproved: false,
      offeror: user.name,
      targetPost: projectPost._id
    })

    offerToAdd.user = user._id

    await offerToAdd.save()

    projectPost.offers = projectPost.offers.concat(offerToAdd._id)
    let updatedprojectPost = await projectPost.save()

    user.offers = user.offers.concat(offerToAdd._id)
    await user.save()

    updatedprojectPost = await ProjectPost.findById(projectPost.id).populate('user').populate({ path: 'offers' })
    response.status(201).json(updatedprojectPost)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }

})

router.delete('/:id/offers/:oid', userExtractor, async (request, response) => {
  try {
    const projectPost = await ProjectPost.findById(request.params.id)
    const user = request.user
    const offerId = request.params.oid

    const offerToDelete = await Offer.findById(offerId)

    if (!user || !(offerToDelete.user.toString() === user._id.toString() || user._id.toString() === projectPost.user.toString())) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    await offerToDelete.remove()

    user.offers = user.offers.filter(c => c._id.toString() !== offerId)
    await user.save()
    projectPost.offers = projectPost.offers.filter(c => c._id.toString() !== offerId)
    let updatedprojectPost = await projectPost.save()

    updatedprojectPost = await ProjectPost.findById(projectPost.id).populate('user').populate({ path: 'offers' })
    response.status(201).json(updatedprojectPost)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

module.exports = router