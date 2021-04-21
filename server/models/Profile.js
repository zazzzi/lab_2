const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const hashedPassword = await bcrypt.hash(req.body.password, 10);

const profileSchema = new mongoose.Schema({
  userName: { type: String, trim: true },
  password: hashedPassword,
  role: { type: String },
  name: { type: String, trim: true },
});

module.exports = mongoose.model("Profile", profileSchema);
