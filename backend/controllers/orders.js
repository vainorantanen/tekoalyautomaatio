const router = require('express').Router()
const Order = require('../models/order')

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const orders = await Order
    .find({})
    .populate('user', { name: 1 })
  response.json(orders)
})

router.post('/', userExtractor, async (request, response) => {
  try {
    const order = new Order({
      orderDate: new Date(),
    })

    const user = request.user

    if (!user || user.isDeveloper === false) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    order.user = user._id

    let createdorder = await order.save()

    user.orders = user.orders.concat(createdorder._id)
    await user.save()

    user.subscriptionModel = 'premium'
    await user.save()

    createdorder = await Order.findById(createdorder._id).populate('user')

    response.status(201).json(createdorder)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.put('/:id/end', userExtractor, async (request, response) => {

  try {
    const user = request.user

    const order = await Order.findById(request.params.id)

    if (!user || order.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    user.subscriptionModel = 'none'
    await user.save()

    let updatedorder = await Order.findByIdAndUpdate(request.params.id,  { isActive: false, endDate: new Date() }, { new: true })

    updatedorder = await Order.findById(updatedorder._id).populate('user')

    response.json(updatedorder)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

module.exports = router