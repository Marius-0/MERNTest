import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }, 
  body: {
    type: String,
    required: true
  }, 
  likes: {
    type: [ mongoose.Schema.Types.ObjectId ]
  },
}, {
  timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment