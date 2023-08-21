const mongoose = require("mongoose");
const addressSchema = require("./address-model");


const userSchema = new mongoose.Schema({
  token: {
    type: String,
    required: false,
  },
 
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  displayPicture: {
    type: String,
    required: false,
    default: "",
  },
  role: {
    type: String,
    enum: ["customer", "admin", "seller"],
    default: "customer",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // addresses: [addressSchema],
  addresses: {
    // type: [addressSchema.schema],

    type: [addressSchema],
    required: false,
    default: [addressSchema],
  },
  
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = mongoose.model("User", userSchema);
