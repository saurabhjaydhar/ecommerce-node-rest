const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ProductModel = require('../model/product-model');
const user = require('../model/user-model');

const createProduct = async (req, res) => {
  console.log(`product data|${res}`);
  const { title, description, salePrice, actualPrice, tags } = req.body;

  if (title == '') {
    return res.status(400).json({ message: 'Please enter required details.' });
  }
  const productLength = await ProductModel.count();
  console.log('productLength', productLength);

  const existProduct = await ProductModel.findOne({ title: title });
  if (existProduct) {
    // console.log('checkexistProduct', existProduct);
    return res.status(300).json({ message: 'Product is already avaialble' });
  }

  const create = await ProductModel.create({
    // productId: create._id,
    title: title,
    description: description,
    salePrice: salePrice,
    actualPrice: actualPrice,
    tags: tags,
  });
  console.log(create);

  if (create) {
    res.status(200).json({
      message: 'Product created successfully ',
      productDetails: {
        title: title,
        description: description,
        salePrice: salePrice,
        actualPrice: actualPrice,
        tags: tags,
        // productId: create._id,
      },
    });
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const deleteProductById = async (req, res) => {
  const { productId } = req.body;

  var getProduct = await ProductModel.findOne({ productId: productId });
  console.log('getProduct', getProduct);

  if (getProduct) {
    ProductModel.deleteOne({ productId: productId }).then((val) => {
      console.log('getid', val);
      res.status(200).json({ message: 'Sucessfully deleted' });
    });
  } else {
    // console.log('getid1', val);
    res.status(400).json({ message: 'Something went wrong' });
  }
};
const getProductDetailsById = async (req, res) => {
  const { id } = req.params;
  console.log('checkid', id);

  console.log(id);
  const existProduct = await ProductModel.findOne({ _id: id })
    .then((val) => {
      res.status(200).json({ message: 'sucessfull', productData: val });
    })
    .catch((error) => {
      res.status(400).json({ message: 'No Product available' });
    });

  console.log('existProduct', existProduct);
};

const getAllProduct = async (req, res) => {
  // const { id } = req.params;
  // console.log(req.headers.authorization);
  // const token = extractToken(req);

  // if (token) {
  //   const decodeToken = jwt.verify(
  //     token,
  //     'SXqrqphaiLc92_sibuxhsEPvtjQlUx_WwMxdjZ7qp-odX3kAUbZi-H4ZvazieO2D',
  //   );
  console.log('req', req);
  // }

  const existProduct = await ProductModel.find()
    .then((val) => {
      res.status(200).json({ message: 'sucessfull', productData: val });
    })
    .catch((error) => {
      res.status(400).json({ message: 'No Product available' });
    });

  // console.log('existProduct', existProduct);
};

const deleteAllProduct = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const existProduct = await ProductModel.remove()
    .then((val) => {
      res.status(200).json({ message: 'sucessfull', productData: val });
    })
    .catch((error) => {
      res.status(400).json({ message: 'No Product available' });
    });

  console.log('existProduct', existProduct);
};

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

const verifyToken = (req, res, next) => {
  const token = extractToken(req);
  console.log(token);

  if (token) {
    try {
      const decodeToken = jwt.verify(
        token,
        'SXqrqphaiLc92_sibuxhsEPvtjQlUx_WwMxdjZ7qp-odX3kAUbZi-H4ZvazieO2D',
      );
      console.log(decodeToken);
      const email = decodeToken.email;
      req.body.email = email;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Authorization error' });
    }
  }
};

module.exports = {
  getAllProduct,
  deleteAllProduct,
  createProduct,
  getProductDetailsById,
  deleteProductById,
  verifyToken,
  extractToken,
};
