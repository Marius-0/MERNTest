import mongoose from 'mongoose'

const mediaSchema = mongoose.Schema({
  name: {
    type: String
  }, 
  url: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Media = mongoose.model('Media', mediaSchema)

export default Media