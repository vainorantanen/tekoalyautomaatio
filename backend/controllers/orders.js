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
  const { orderType } = request.body
  const order = new Order({
    orderType,
    timeStamp: new Date(),
  })

  const user = request.user

  if (!user || user.isDeveloper === false) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  order.user = user._id

  let createdorder = await order.save()

  user.orders = user.orders.concat(createdorder._id)
  await user.save()

  createdorder = await Order.findById(createdorder._id).populate('user')

  response.status(201).json(createdorder)
})

router.put('/:id', userExtractor, async (request, response) => {
  const { isActive } = request.body

  const user = request.user

  const devPost = await Order.findById(request.params.id)

  if (!user || devPost.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  let updatedorder = await Order.findByIdAndUpdate(request.params.id,  { isActive }, { new: true })

  updatedorder = await Order.findById(updatedorder._id).populate('user')

  response.json(updatedorder)
})

module.exports = router