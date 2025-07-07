// models/Review.js
const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: String,
  review: String,
  rating: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", ReviewSchema);
