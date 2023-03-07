const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    model: String,
    price: String,
    company: String,
  },
  { timestamps: true }
);

const Product = new mongoose.model("addProduct", ProductSchema);

module.exports = Product;
