const router = require('express').Router()
const Contact = require('../models/contact')
//const multer = require('multer')

//const { userExtractor } = require('../utils/middleware')
/*
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads')
  },
  filename: function(req, file, cb) {
    return cb(null, new Date().toISOString() + file.originalname)
  }
})

const upload = multer({ storage: storage })
*/

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
  //console.log("aINFO", additionalinfo)
  const contact = new Contact({
    email, isCompany
  })
  /*
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  course.user = user._id


  user.courses = user.courses.concat(createdCourse._id)
  await user.save()
*/

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

/*
router.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const user = request.user

  if (!user || blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  user.blogs = user.blogs.filter(b => b.toString() !== blog.id.toString() )

  await user.save()
  await blog.remove()

  response.status(204).end()
})
*/

module.exports = router
