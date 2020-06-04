var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var reservationSchema = new Schema({
  donor_name: {
    type: String,
  },
  donor_mobile: {
    type: String,
  },
  user_id: {
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
  status: {
    type: String,
    default: "Not Approved",
  },
  date_donated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("reservation", reservationSchema);
