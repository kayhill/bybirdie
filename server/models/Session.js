const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SessionSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  createdAt:{ type: Date, default: Date.now },
  lat: { type: Number, required:true },
  lng: { type: Number, required:true },
  birds: [String]
})


Session = mongoose.model('session', SessionSchema)

module.exports = Session;