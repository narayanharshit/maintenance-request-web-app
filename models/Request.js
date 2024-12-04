const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  requestID: { type: String, required: true, unique: true },
  apartment: { type: String, required: true },
  area: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'pending', enum: ['pending', 'completed'] },
});

module.exports = mongoose.model('Request', RequestSchema);