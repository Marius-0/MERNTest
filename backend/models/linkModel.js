import mongoose from 'mongoose'

const linkSchema = mongoose.Schema({
  websiteURL: {
    type: String,
    required: true
  }, 
  urlPostfix: {
    type: String
  }, 
  title: {
    type: String,
    required: true
  },
  media: {
    type: [String]
  }
}, {
  timestamps: true
})

const Link = mongoose.model('Link', linkSchema)

export default Link