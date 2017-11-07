var mongoose = require('mongoose');

var product = mongoose.model('product', {
  category: {
    type: String,
    required: true
  },
  productId: {
    type: Number,
    trim: true,
  },
  productName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  price: {
    type: Number
  },
  stockQuantity: {
    type: Number,
    required: true,
    trim: true,
    minlength: 1
  }
});

module.exports = {
  product
};
