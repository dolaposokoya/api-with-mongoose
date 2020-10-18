const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const metadataSchema = new Schema({
  // gender: {
  //   type: Array,
  //   required: false,
  //   unique: false,
  // },
  bloodgroup: {
    type: Array,
    required: false,
    unique: false,
  },
  state: {
    type: Array,
    required: false,
    unique: false,
  },
},
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("metadata", metadataSchema);

