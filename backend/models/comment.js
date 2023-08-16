const mongoose = require('mongoose')

const schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content : {
    type: String,
    required: true
  },
  timeStamp: {
    type: Date,
    required: true
  },
  commentorName: {
    type: String,
    required: true
  },
  targetPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FeedPost'
  }
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('FeedPostComment', schema)