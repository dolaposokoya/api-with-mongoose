<<<<<<< HEAD
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var requestSchema = new Schema({
  patient_name: {
    type: String,
  },
  patient_mobile: {
    type: String,
  },
  patient_email: {
    type: String,
  },
  user_id: {
    type: String,
  },
  date_needed: {
    type: Date,
  },
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
  hospital_email: {
    type: String,
  },
  hospital_phone: {
    type: String,
  },
  status: {
    type: String,
    default: "Not Approved",
  },
},
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("requests", requestSchema);
=======
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var requestSchema = new Schema({
  patient_name: {
    type: String,
  },
  patient_mobile: {
    type: String,
  },
  patient_email: {
    type: String,
  },
  user_id: {
    type: String,
  },
  date_needed: {
    type: Date,
  },
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
  hospital_email: {
    type: String,
  },
  hospital_phone: {
    type: String,
  },
  status: {
    type: String,
    default: "Not Approved",
  },
},
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("requests", requestSchema);
>>>>>>> 19b8d41739230428bf5fb61908e3dac61d7e42eb
