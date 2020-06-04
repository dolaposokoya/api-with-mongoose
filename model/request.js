var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var requestSchema = new Schema({
  patient_name: {
    type: String,
  },
  patient_mobile: {
    type: String,
  },
  patient_email: { type: String },
  user_id: {
    type: String,
  },
  date_needed: { type: Date },
  blood_group: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  state: {
    type: String,
  },
  hospital_name: {
    type: String,
  },
  hospital_address: {
    type: String,
  },
  doctor_name: {
    type: String,
  },
  hospital_mobile: {
    type: String,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    default: "Not Approved",
  },
});

module.exports = mongoose.model("requests", requestSchema);
