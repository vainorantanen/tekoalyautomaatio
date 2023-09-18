const mongoose = require('mongoose')

const schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  timeStamp: {
    type: Date,
    required: true
  },
  orderType: {
    type: String,
    enum: ['none', 'premium'],
    required: true,
    default: 'none'
  },
  isActive: {
    type: Boolean,
    default: true
  }
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Order', schema)
