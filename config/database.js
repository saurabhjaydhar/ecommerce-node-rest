const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((value) => {
      console.log(`mongoose connection done | ${value}`);
    })
    .catch((error) => {
      console.log(`mongoose connection failed | ${error}`);
    });
};

module.exports = connectDB;
