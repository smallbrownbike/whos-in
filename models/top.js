mongoose = require('mongoose');

const topSchema = new mongoose.Schema({
  group: String,
  count: Number,
  created: {type: Date, expires: '1d', default: Date.now()}
})

const Top = mongoose.model('Top', topSchema)

module.exports = Top;