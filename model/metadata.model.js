<<<<<<< HEAD
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var metadataSchema = new Schema({
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
=======
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var metadataSchema = new Schema({
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
>>>>>>> 19b8d41739230428bf5fb61908e3dac61d7e42eb
