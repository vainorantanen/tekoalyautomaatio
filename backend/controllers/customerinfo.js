const router = require('express').Router()
const CustomerInfo = require('../models/customerinfo')
const Message = require('../models/message')
const PortalBid = require('../models/portalbid')
const DevsPost = require('../models/devsPost')
const Offer = require('../models/offer')

const { userExtractor, isUserDisabled } = require('../utils/middleware')

router.get('/', userExtractor, async (request, response) => {
  const user = request.user

  if (!user) {
    response.json([])
  } else if (user.username === 'admin') {
    const customerinfo = await CustomerInfo
      .find({}).populate({ path: 'messages' })
      .populate('sender', { name: 1 }).populate('targetDeveloper', { name: 1 })
    response.json(customerinfo)
  } else if (!user.isDeveloper) {
    // normi käyttäjä voi hakea ne yhteydenotot, jotka hän itse on lähettänyt
    const customerinfo = await CustomerInfo
      .find({ sender: user._id.toString() }).populate({ path: 'messages' })
      .populate('sender', { name: 1 }).populate('targetDeveloper', { name: 1 })
    response.json(customerinfo)
  } else if (user.isDeveloper) {
    // yrityskäyttäjät voi hakea ne, jotka on kohdistettu heille
    const customerinfo = await CustomerInfo
      .find({ targetDeveloper: user._id.toString() }).populate({ path: 'messages' })
      .populate('sender', { name: 1 }).populate('targetDeveloper', { name: 1 })
    response.json(customerinfo)
  } else {
    response.json([])
  }
})

router.post('/', userExtractor, async (request, response) => {
  try {
    const { senderEmail, senderPhone, offer, devPost, startingMessage } = request.body

    const user = request.user

    if (!user || (!offer && !devPost)) {
      return response.status(401).json({ error: 'Palvelinvirhe (operaatiota ei sallittu)' })
    }

    const checkIfUserDisabled = await isUserDisabled(user)

    if (checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'Tapahtui virhe! Käyttäjäsi on disabloitu!' })
    }

    const customerinfo = new CustomerInfo({
      senderEmail,
      senderPhone,
      startingMessage,
      timeStamp: new Date()
    })

    // jos kyseessä on tarjoukseen (offer) liittyvä yhteydenotto
    if (offer && !devPost) {
      if (offer.isPortalBid === true) {
        const portalOfferFromdb = await PortalBid.findById(offer.id)
        if (!portalOfferFromdb) {
          return response.status(400).json({ error: 'Tarjousta ei ole enää olemassa, se on todennäköisesti poistettu' })
        } else {
          customerinfo.relatedPortalBid = portalOfferFromdb._id
          customerinfo.targetDeveloper = portalOfferFromdb.user
          customerinfo.relatedPortalPost = portalOfferFromdb.targetPost
        }
      } else if (offer.isPortalBid === false) {
        const feedOfferFromdb = await Offer.findById(offer.id)
        if (!feedOfferFromdb) {
          return response.status(400).json({ error: 'Tarjousta ei ole enää olemassa, se on todennäköisesti poistettu' })
        } else {
          customerinfo.relatedProjectOffer = feedOfferFromdb._id
          customerinfo.targetDeveloper = feedOfferFromdb.user
          customerinfo.relatedProjectPost = feedOfferFromdb.targetPost
        }
      } else {
        return response.status(400).json({ error: 'Tarjousta ei ole enää olemassa, se on todennäköisesti poistettu' })
      }
    } else if (!offer && devPost) {
      const devPostFromDb = await DevsPost.findById(devPost.id)
      if (!devPostFromDb) {
        return response.status(400).json({ error: 'Ilmoitusta ei ole enää olemassa, se on todennäköisesti poistettu' })
      }
      customerinfo.relatesToDevPost = true
      customerinfo.relatedDevPost = devPostFromDb._id
      customerinfo.targetDeveloper = devPostFromDb.user
    } else {
      return response.status(400).json({ error: 'Palvelinvirhe ilmoituksen löytämisessä' })
    }

    customerinfo.sender = user._id

    let createdcustomerinfo = await customerinfo.save()

    createdcustomerinfo = await CustomerInfo.findById(createdcustomerinfo._id)
      .populate('sender', { name: 1 }).populate('targetDeveloper', { name: 1 })

    response.status(201).json(createdcustomerinfo)
  } catch (error) {
    response.status(500).json({ error: 'Palvelimella tapahtui virhe, yritä myöhemmin uudelleen' })
  }
})

router.post('/sendMessage/:id', userExtractor, async (request, response) => {
  try {
    const { content, isOffer } = request.body

    const user = request.user

    const customerInfo = await CustomerInfo.findById(request.params.id)

    if (!user || !customerInfo) {
      return response.status(401).json({ error: 'Palvelinvirhe (operaatiota ei sallittu)' })
    }

    const checkIfUserDisabled = await isUserDisabled(user)

    if (checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'Tapahtui virhe! Käyttäjäsi on disabloitu!' })
    }

    const messageToSend = new Message({
      content,
      isOffer,
      timeStamp: new Date()
    })

    messageToSend.user = user._id

    await messageToSend.save()

    customerInfo.messages = customerInfo.messages.concat(messageToSend._id)
    let updatedCustomerInfo = await customerInfo.save()

    updatedCustomerInfo = await CustomerInfo.findById(customerInfo.id)
      .populate({ path: 'messages' })
      .populate('sender', { name: 1 }).populate('targetDeveloper', { name: 1 })

    response.status(201).json(updatedCustomerInfo)
  } catch (error) {
    response.status(500).json({ error: 'Palvelimella tapahtui virhe, yritä myöhemmin uudelleen' })
  }
})

router.put('/:id/updateMessage/:mid', userExtractor, async (request, response) => {
  try {
    const user = request.user
    const { isApproved } = request.body

    const message = await Message.findById(request.params.mid)
    const customeriInfo = await CustomerInfo.findById(request.params.id)

    if (!message || !customeriInfo) {
      return response.status(400).json({ error: 'Tapahtui virhe! Postaus tai tarjous on poistettu tai suljettu' })
    }

    if (message.isApproved !== 'waiting') {
      return response.status(400).json({ error: 'Tapahtui virhe! Viesti on jo hyväksytty tai hylätty!' })
    }

    const checkIfUserDisabled = await isUserDisabled(user)

    // viestin lähettänyt henkilö ei voi muokata sen tilaa
    if (!user || message.user.toString() === user.id.toString()
    || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    // Update the isApproved field of the specified message
    const updatedMessage = await Message.findByIdAndUpdate(request.params.mid, { isApproved }, { new: true })

    const updatedMessageArray = customeriInfo.messages.map(mes =>
      mes._id.equals(updatedMessage._id) ? updatedMessage : mes
    )

    const updatedCustomerInfo = await CustomerInfo.findByIdAndUpdate(
      request.params.id,
      { messages: updatedMessageArray },
      { new: true })
      .populate('messages')
      .populate('sender', { name: 1 }).populate('targetDeveloper', { name: 1 })

    response.json(updatedCustomerInfo)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

module.exports = router