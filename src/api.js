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
const mongoose = require('mongoose');
// connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    'mongodb+srv://saurabh:qwerty1234@cluster0.1cm0jr7.mongodb.net/auth?retryWrites=true&w=majority',
    { keepAlive: true, keepAliveInitialDelay: 300000 },
  )
  .then((value) => {
    console.log(`mongoose connection done | ${value}`);
  })
  .catch((error) => {
    console.log(`mongoose connection failed | ${error}`);
  });

// app.use('/api', authRouter);
// app.use('/api/products', productRouter);
// app.use('/', cartRouter);

router.get('/', (req, res) => {
  res.json({
    hello: 'hi! even',
  });
});

// app.use('/.netlify/functions/server', router);
// app.use(`/.netlify/functions/api`, router);
app.use(`/.netlify/functions/api`, router);
app.use(`/.netlify/functions/api/cart`, cartRouter);
app.use(`/.netlify/functions/api/products`, productRouter);
app.use(`/.netlify/functions/api/auth`, authRouter);

// app.listen(process.env.PORT, () => {
//   console.log(
//     `server start listening on port http://localhost:${process.env.PORT}/`,
//   );
// });

module.exports.handler = serverless(app);
