const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: {
    type: [],
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
// autoIncrement.initialize(mongoose.connection);
// productSchema.plugin(autoIncrement.plugin, 'Product');

module.exports = mongoose.model('Product', productSchema);
