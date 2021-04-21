const mongoose = require("mongoose");


const profileSchema = new mongoose.Schema({
  userName: { type: String, trim: true, , unique: true },
  password: {type: String},
  role: { type: String },
  name: { type: String, trim: true },
});

module.exports = mongoose.model("Profile", profileSchema);
