const router = require('express').Router()
const Chat = require('../models/chat')
const Message = require('../models/message')

const { userExtractor } = require('../utils/middleware')

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

  const { targetUser } = request.body

  const chat = new Chat({
    messages: [],
    user2: targetUser
  })

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  chat.user1 = user._id

  let createdchat = await chat.save()

  user.chats = user.chats.concat(createdchat._id)
  await user.save()

  createdchat = await Chat.findById(createdchat._id).populate('user1').populate('user2')

  response.status(201).json(createdchat)
})

/*
router.delete('/:id', userExtractor, async (request, response) => {

  const postId = request.params.id
  const post = await chat.findById(postId)


  const user = request.user

  if (!user || post.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  // poistetaan käyttäjän chateista kyseinen chat

  user.chats = user.chats.filter(b => b.toString() !== post.id.toString() )

  await user.save()

  // Remove related messages for the post
  await chatComment.deleteMany({ targetPost: postId })

  await post.remove()

  response.status(204).end()
})
*/

router.post('/:id/messages', userExtractor, async (request, response) => {
  const { content } = request.body

  const user = request.user

  const chat = await Chat.findById(request.params.id)
  console.log(user._id.toString() === chat.user1.toString())

  if (!user || !chat || (user._id.toString() !== chat.user1.toString() && user._id.toString() !== chat.user2.toString() )) {
    return response.status(401).json({ error: 'operation not permitted' })
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

})

module.exports = router