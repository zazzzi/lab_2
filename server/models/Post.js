const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: { type: String, max: 150, required: true},
  name: {type: String},
  author: { type: String },
  likes: { type: Number },
  date: { type: String },
  liked: { type: Boolean},
});

module.exports = mongoose.model("Post", postSchema);
