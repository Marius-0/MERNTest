import mongoose from 'mongoose'

const groupSchema = mongoose.Schema({
  posts: [ mongoose.Schema.Types.ObjectId ], 
  chatId: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  users: [ mongoose.Schema.Types.ObjectId ],
  name: String
}, {
  timestamps: true
})

const Group = mongoose.model('Group', groupSchema)

export default Group