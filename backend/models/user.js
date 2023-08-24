const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  name: String,
  description: String,
  passwordHash: String,
  email: {
    type: String,
    required: true
  },
  projectPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProjectPost'
    }
  ],
  isDeveloper: Boolean,
  devsPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DevsPost'
    }
  ],
  feedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FeedPost'
    }
  ],
  offers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offer'
    }
  ],
  portalPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PortalPost'
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
