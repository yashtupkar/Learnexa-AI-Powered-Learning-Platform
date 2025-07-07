const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String},
  description: { type: String },
  url: { type: String, unique: true }, // News article URL
  urlToImage: { type: String }, // Image URL
  publishedAt: { type: Date, default: Date.now },
  source: { type: String },
  category: { type: String },
});

module.exports = mongoose.model("News", newsSchema);
