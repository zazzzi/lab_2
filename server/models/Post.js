const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: { type: String, max: 150},
  name: {type: String},
  author: { type: String },
  likes: { type: Number },
  date: { type: String },
});

module.exports = mongoose.model("Post", postSchema);
