const express = require('express');
const cartRouter = express.Router();
const {
  getAllCartItem,
  addItemToCart,
  deleteAllItemFromCart,
} = require('../controllers/cart_controller');
cartRouter.get('/all', getAllCartItem);
cartRouter.delete('/all', deleteAllItemFromCart);
cartRouter.post('/add', addItemToCart);

module.exports = cartRouter;
