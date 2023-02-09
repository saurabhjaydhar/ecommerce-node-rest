const express = require('express');
const productRouter = express.Router();
const {
  getAllProduct,
  deleteAllProduct,
  createProduct,
  getProductDetailsById,
  deleteProductById,
  verifyToken,
} = require('../controllers/product-controller');
productRouter.post('/create', createProduct);
productRouter.get('/get/all', getAllProduct);
productRouter.get('/get/:id', getProductDetailsById);
productRouter.delete('/delete', deleteAllProduct);
productRouter.post('/delete', deleteProductById);
module.exports = productRouter;
