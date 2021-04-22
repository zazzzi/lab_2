const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const profileSchema = new mongoose.Schema({
  userName: { type: String, trim: true, unique: true },
  password: {type: String},
  role: { type: String },
  name: { type: String, trim: true },
});

// profileSchema.pre(
//   ["save", "findOneAndUpdate"],
//   async function (next) {
//     // const user = this;

//     // { document: true, query: false }
//     // const docToUpdate = await this.model.findOne(this.getQuery());

//     // if (!this.isModified("password")) {
//     //   return next();
//     // }

//     // docToUpdate.password = bcrypt.hashSync(this.password, 10);
//     // next();

//     const user = this;

//     // only hash the password if it has been modified (or is new)
//     if (!user._update.password) {
//       return next();
//     }

//     await bcrypt.genSalt(10, function (err, salt, next) {
//       if (err) return next(err);

//       bcrypt.hash(user.password, salt, function (err, hash, next) {
//         if (err) return next(err);
//         user.password = hash;
//         next();
//       });
//     });
//   }
// );

module.exports = mongoose.model("Profile", profileSchema);
