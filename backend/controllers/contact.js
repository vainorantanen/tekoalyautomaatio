const router = require('express').Router()
const Contact = require('../models/contact')

router.get('/', async (request, response) => {
  const contacts = await Contact
    .find({})

  response.json(contacts)
})

router.get('/:id', async (request, response) => {
  const contacts = await Contact
    .findById(request.params.id)

  response.json(contacts)
})

router.post('/', async (request, response) => {
  const { email, isCompany } = request.body

  const contact = new Contact({
    email, isCompany
  })

  let createdContact = await contact.save()

  createdContact = await Contact.findById(createdContact._id)

  response.status(201).json(createdContact)
})
// muutetaan luetuksi
router.put('/:id', async (request, response) => {
  const { name, email, message } = request.body

  let updatedPublishing = await Contact.findByIdAndUpdate(request.params.id,
    { name, email, message, read: true }, { new: true })

  updatedPublishing = await Contact.findById(updatedPublishing._id)

  response.json(updatedPublishing)
})

module.exports = router
