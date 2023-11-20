const mongoose = require('mongoose')

const schema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
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
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProjectTask'
    }
  ],
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

module.exports = mongoose.model('Project', schema)