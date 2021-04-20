const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  content: { type: String },
  author: { type: String },
  likes: { type: Number },
  date: { type: String },
});

module.exports = mongoose.model("Post", Post);