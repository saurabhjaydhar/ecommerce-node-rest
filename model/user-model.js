const mongoose = require('mongoose');
const addressSchema = require('./address-model');

const userSchema = new mongoose.Schema({
  token: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  displayPicture: {
    type: String,
    required: false,
    default: '',
  },
  // address: {
  //   type: [addressSchema.schema],
  //   required: false,
  //   default: [addressSchema],
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
