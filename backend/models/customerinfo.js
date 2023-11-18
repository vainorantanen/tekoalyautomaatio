const mongoose = require('mongoose')

const schema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetDeveloper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  senderEmail: {
    type: String,
    required: true
  },
  senderPhone: String,
  relatedProjectOffer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer'
  },
  relatedPortalBid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PortalBid'
  },
  startingMessage: String,
  timeStamp: {
    type: Date,
    required: true
  },
  relatedProjectPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProjectPost'
  },
  relatedPortalPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PortalPost'
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }
  ],
  relatesToDevPost: {
    type: Boolean,
    default: false
  },
  relatedDevPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DevsPost'
  },

})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('CustomerInfo', schema)