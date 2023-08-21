const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
    default: '',
  },
  city: {
    type: String,
    required: true,
    default: '',
  },
  state: {
    type: String,
    required: true,
    default: '',
  },
  zip: {
    type: String,
    required: true,
    default: '',
  },
  country: {
    type: String,
    required: true,
    default: '',
  },
});

module.exports = mongoose.model('Address', addressSchema);
