const Order = require('./models/order'); // Adjust the path as needed

const {jwtVerify,extractToken}=require("../services/auth-service")

// Create a new order
const createOrder = async (req, res) => {
  try {
    const {  items, totalAmount } = req.body;
    const user = await userModel.findOne({ email: req.body.email });
    const userId= user._id;
    const newOrder = new Order({
      userId: userId,
      items,
      totalAmount,
      status: 'pending', // Default status
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
};

// Get orders for a user
const getOrdersForUser = async (req, res) => {
   
  try {
    const user = await userModel.findOne({ email: req.body.email });
    const userId= user._id;

    const orders = await Order.find({ userId: userId }).populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving orders' });
  }
};

module.exports={createOrder,getOrdersForUser}