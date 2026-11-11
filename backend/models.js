// Modelos: la "forma" de los datos que se guardan en MongoDB
const mongoose = require("mongoose");

const Product = mongoose.model("Product", new mongoose.Schema({
  name:  { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  cat:   { type: String, required: true, enum: ["Ropa", "Zapatos", "Bolsos"] },
  tags:  [String],
  img:   { type: String, default: "" },
  desc:  { type: String, default: "" }
}));

const Message = mongoose.model("Message", new mongoose.Schema({
  name:    { type: String, required: true, trim: true, maxlength: 80 },
  contact: { type: String, required: true, trim: true, maxlength: 120 },
  msg:     { type: String, required: true, trim: true, maxlength: 1000 },
  date:    { type: Date, default: Date.now }
}));

const User = mongoose.model("User", new mongoose.Schema({
  username:     { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
}));

module.exports = { Product, Message, User };
