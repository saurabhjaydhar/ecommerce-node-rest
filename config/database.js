const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = () => {
  mongoose
    .connect(
      'mongodb+srv://saurabh:qwerty1234@cluster0.1cm0jr7.mongodb.net/?retryWrites=true&w=majority',
      { useNewUrlParser: true },
    )
    .then((value) => {
      console.log(`mongoose connection done | ${value}`);
    })
    .catch((error) => {
      console.log(`mongoose connection failed | ${error}`);
    });
  mongoose.set('strictQuery', true);
};

module.exports = connectDB;
