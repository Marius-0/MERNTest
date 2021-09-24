import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  accountNumber: {
    type: String,
    required: false,
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
      unique:true,
      sparse: true
  },
  password: {
      type: String
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
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
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'master'],
    default: 'user'
  },
  token: {
    type: String
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User