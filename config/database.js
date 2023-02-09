const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = () => {
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
  // mongoose.set('strictQuery', true);
};

module.exports = connectDB;
