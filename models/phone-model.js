const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const phoneSchema = new Schema({
  // document structure & rules
  brand: { type: String, required: true },
  model: { type: String, required: true },
  image: { type: String, required: true },
  specs: [
    { type: String, minlength: 5 }
  ],
}, {
  // additional settings for Schema constructor function (class)
  timestamps: true
});

const Phone = mongoose.model("Phone", phoneSchema);


module.exports = Phone;
