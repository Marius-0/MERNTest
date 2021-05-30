import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }, 
  body: {
    type: String
  },
  media_: [ String ], 
  link: String,
  likes:{
    type: [ mongoose.Schema.Types.ObjectId ]
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }], 
  tags: {
    type: [ mongoose.Schema.Types.ObjectId ]
  }
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export default Post