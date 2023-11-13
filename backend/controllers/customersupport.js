const router = require('express').Router()
const CustomerSupportPost = require('../models/customerSupportPost')

const { userExtractor } = require('../utils/middleware')

router.get('/', userExtractor, async (request, response) => {
  const user = request.user

  // vain admin näkee asiakaspalvelun kanavan
  if (!user) {
    response.json([])
  } else if(user.username === 'admin') {
    const customerSupportPosts = await CustomerSupportPost
      .find({})
      .populate('user', { name: 1 })
    response.json(customerSupportPosts)
  } else {
    response.json([])
  }
})

router.post('/', userExtractor, async (request, response) => {
  try {
    const { description, title, email } = request.body
    const customerSupportPost = new CustomerSupportPost({
      description,
      timeStamp: new Date(),
      title,
      email
    })

    const user = request.user
    // kuka vain voi ottaa yhteyden aspaan, mutta jos käyttäjä on kirjautunut, tallennetaan se
    if (user) {
      customerSupportPost.user = user._id
    }

    let createdcustomerSupportPost = await customerSupportPost.save()

    createdcustomerSupportPost = await CustomerSupportPost.findById(createdcustomerSupportPost._id).populate('user')

    response.status(201).json(createdcustomerSupportPost)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.put('/:id', userExtractor, async (request, response) => {
  try {
    const { isDone, isImportant } = request.body

    const user = request.user

    // vain admin tai pyynnön lisännyt käyttäjä voi muokata
    if (!user || !user.username === 'admin') {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    let updatedcustomerSupportPost = await CustomerSupportPost.findByIdAndUpdate(request.params.id,  { isDone, isImportant }, { new: true })

    updatedcustomerSupportPost = await CustomerSupportPost.findById(updatedcustomerSupportPost._id).populate('user')

    response.json(updatedcustomerSupportPost)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.delete('/:id', userExtractor, async (request, response) => {
  try {
    const post = await CustomerSupportPost.findById(request.params.id)

    const user = request.user

    if (!user || !user.username === 'admin') {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    await post.remove()

    response.status(204).end()
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

module.exports = router