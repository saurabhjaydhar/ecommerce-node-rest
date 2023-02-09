const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = () => {
  mongoose
    .connect(
      // process.env.DB_URI
      'mongodb+srv://saurabh:qwerty1234@cluster0.1cm0jr7.mongodb.net/?retryWrites=true&w=majority',
    )
    .then((value) => {
      console.log(`mongoose connection done | ${value}`);
    })
    .catch((error) => {
      console.log(`mongoose connection failed | ${error}`);
    });
};

module.exports = connectDB;
