const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
  tenantID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  apartment: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date },
});

module.exports = mongoose.model('Tenant', TenantSchema);