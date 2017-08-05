mongoose = require('mongoose');

const topSchema = new mongoose.Schema({
  group: String,
  count: Number
})

const Top = mongoose.model('Top', topSchema)

module.exports = Top;