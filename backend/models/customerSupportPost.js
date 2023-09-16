const mongoose = require('mongoose')

const schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description : {
    type: String,
    required: true
  },
  email: String,
  timeStamp: {
    type: Date,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  },
  isImportant: {
    type: Boolean,
    default: false
  }
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('CustomerSupportPost', schema)