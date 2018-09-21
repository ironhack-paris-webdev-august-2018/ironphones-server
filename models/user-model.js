
const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema({
  // document structure & rules
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^.+@.+\..+$/,
  },
  encryptedPassword: { type: String },
  role: {
    type: String,
    enum: [ "normal", "admin" ],
    required: true,
    default: "normal",
  },
  avatar: {
    type: String,
    default: "/images/avatar.png",
  }
}, {
  // additional settings for Schema constructor function (class)
  timestamps: true,
});

// define the "isAdmin" virtual property (a property that's really a method)
// CAN'T be an arrow function because it uses "this"
// (we use this to get around the limits on conditions in HBS files)
userSchema.virtual("isAdmin").get(function () {
  return this.role === "admin";
});

const User = mongoose.model("User", userSchema);


module.exports = User;
