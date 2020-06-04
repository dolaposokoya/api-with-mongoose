var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  profile_id: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  username: {
    type: String,
  },
  user_type: {
    type: String,
    default: "user",
  },
  profile_image: {
    type: Object,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  blood_group: {
    type: String,
  },
  city: { type: String },
  state: { type: String },
  weight: {
    type: Number,
  },
  number_of_request: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  password: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", userSchema);
