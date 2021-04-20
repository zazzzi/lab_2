const mongoose = require("mongoose");
const uri =
  "mongodb+srv://admin:admin@twatter.j7drj.mongodb.net/Twatter?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected");
});

const userSchema = new mongoose.Schema({
  name: String,
});
const contentSchema = new mongoose.Schema({
  content: String,
});

const User = mongoose.model("user", userSchema);
const Content = mongoose.model("content", contentSchema, "content");

const Post = new Content({ content: "Hej bloggen" });

const Alex = new User({ name: "Alex" });
const Zazzi = new User({ name: "Zazzi" });

// Post.save(function (err) {
//   if (err) return console.error(err);
// });

// Alex.save(function (err) {
//   if (err) return console.error(err);
// });

// Zazzi.save(function (err) {
//   if (err) return console.error(err);
// });

Content.find(function (err, content) {
  if (err) return console.error(err);
  console.log(content);
});
