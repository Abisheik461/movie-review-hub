// server/routes/reviews.js
const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

router.get("/", async (req, res) => {
  const reviews = await Review.find().sort({ date: -1 });
  res.json(reviews);
});


router.post("/", async (req, res) => {
  const newReview = new Review(req.body);
  await newReview.save();
  res.json({ success: true });
});

module.exports = router;
