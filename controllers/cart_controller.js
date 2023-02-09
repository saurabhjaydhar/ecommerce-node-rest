const ProductModel = require('../model/product-model');
const CartModel = require('../model/cart-model');
const user = require('../model/user-model');

const getAllCartItem = async (req, res) => {
  await CartModel.find()
    .then((val) => {
      res.status(200).json({ message: true, cartData: val });
    })
    .catch((error) => {
      res.status(400).json({ mesaage: 'No Item Available', cartData: [] });
    });
};

const deleteAllItemFromCart = async (req, res) => {
  const cartItemLength = await CartModel.count();

  if (cartItemLength > 0) {
    await CartModel.remove()
      .then((val) => {
        res.status(200).json({ message: 'Removed All Item Sucessfully' });
      })
      .catch((error) => {
        res.status(400).json({ message: 'Something went wrong' });
      });
  } else {
    res.status(400).json({ message: 'No Item Available for delete' });
  }
};

const addItemToCart = async (req, res) => {
  const { productId } = req.body;
  const isProductExist = await ProductModel.findOne({ _id: productId });
  const isCartItemExist = await CartModel.findOne({ cartId: productId });

  if (isProductExist) {
    if (isCartItemExist) {
      res.status(400).json({ message: 'Already added in cart' });
    } else {
      cart = await CartModel.create({
        cartId: productId,
        productDetails: isProductExist,
      });

      res.status(200).json({ message: 'Added successfully' });
    }
  } else {
    res.status(400).json({ message: 'Product is not available' });
  }
};

module.exports = { getAllCartItem, addItemToCart, deleteAllItemFromCart };
