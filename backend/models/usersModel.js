import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    unique:true
  },
  firstName: {
      type: String
  },
  secondName:{
      type: String
  },
  displayName: {
      type: String
  },
  email: {
      type: String,
      required: true,
      unique:true
  },
  password: {
      type: String
  },
  groups: {
    type: [ mongoose.Schema.Types.ObjectId ]
  },
  chats: {
    type: [ mongoose.Schema.Types.ObjectId ]
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User