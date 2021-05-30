import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }, 
  body: {
    type: String,
    required: true
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, {
  timestamps: true
})

const Message = mongoose.model('Message', messageSchema)

export default Message