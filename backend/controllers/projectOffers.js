const router = require('express').Router()
const Offer = require('../models/offer')

router.get('/', async (request, response) => {
  const offers = await Offer
    .find({})
    .populate('user', { name: 1 })
  response.json(offers)
})

module.exports = router