const router = require('express').Router()
const Chat = require('../models/chat')
const Message = require('../models/message')

const { userExtractor, isUserDisabled } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const chats = await Chat
    .find({})
    .populate('user1', { name: 1 })
    .populate('user2', { name: 1 })
    .populate({
      path: 'messages',
    })

  response.json(chats)
})

router.post('/', userExtractor, async (request, response) => {
  try {

    const { targetUser, title } = request.body

    const chat = new Chat({
      title,
      messages: [],
      user2: targetUser
    })

    const user = request.user
    const checkIfUserDisabled = isUserDisabled(user)

    if (!user || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    chat.user1 = user._id

    let createdchat = await chat.save()

    user.chats = user.chats.concat(createdchat._id)
    await user.save()

    createdchat = await Chat.findById(createdchat._id).populate('user1').populate('user2')

    response.status(201).json(createdchat)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})


router.post('/:id/messages', userExtractor, async (request, response) => {
  try {
    const { content } = request.body

    const user = request.user

    const chat = await Chat.findById(request.params.id)

    const checkIfUserDisabled = isUserDisabled(user)

    if (!user || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    if (!chat || (user._id.toString() !== chat.user1.toString() && user._id.toString() !== chat.user2.toString() )) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    const message = new Message({
      content,
      timeStamp: new Date(),
    })

    message.user = user._id

    await message.save()

    chat.messages = chat.messages.concat(message._id)
    let updatedchat = await chat.save()

    updatedchat = await Chat.findById(chat.id).populate('user1').populate('user2').populate({ path: 'messages' })
    response.status(201).json(updatedchat)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

module.exports = router