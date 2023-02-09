const { app } = require('../app');
const dotenv = require('dotenv');
dotenv.config({ path: 'config/.env' });
const connectDB = require('../config/database');
const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const authRouter = require('../routes/auth-route');
const productRouter = require('../routes/products-route');
const cartRouter = require('../routes/cart-route');

connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Congrats!',
  });
});
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

// app.use('/.netlify/functions/server', router);
app.use(`/.netlify/functions/server`, router);

app.listen(process.env.PORT, () => {
  console.log(
    `server start listening on port http://localhost:${process.env.PORT}/`,
  );
});

module.exports.handler = serverless(app);
