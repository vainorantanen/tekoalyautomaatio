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
  description: String,
  timeStamp: {
    type: Date,
    required: true
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProjectTask'
    }
  ],
  isCompletedByDev: {
    type: Boolean,
    default: false
  },
  isCompletedByCustomer: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: String,
    enum: ['accepted', 'rejected', 'waiting'],
    default: 'waiting',
    required: true
  }
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Project', schema)