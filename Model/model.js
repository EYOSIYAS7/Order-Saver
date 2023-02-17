const mongoose = require("mongoose");

// Schema is a function to create orderSchema which is an object that controls the structure of the docs
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    name: {
      type: "string",
    },
    phone: {
      type: "Number",
    },
    product: {
      type: "string",
    },
    many: {
      type: "Number",
    },
    color: {
      type: "string",
    },
    styleM: {
      type: "string",
    },
    styleW: {
      type: "string",
    },
    userID: {
      type: "string",
    },
  },
  {
    timestamps: true,
  }
);
const order = mongoose.model("orders", orderSchema);

module.exports = order;
