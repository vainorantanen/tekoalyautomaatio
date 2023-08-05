const mongoose = require('mongoose')

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  isCompany: {
    type: Boolean,
  },
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', schema)