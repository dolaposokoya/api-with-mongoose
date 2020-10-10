var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    profile_id: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    gender: { type: String },
    blood_group: { type: String },
    username: { type: String },
    age: { type: Number },
    user_type: { type: String, default: "user" },
    profile_image: { type: Object },
    email: { type: String },
    password: { type: String },
    mobile: {        type: String,
    },
    date_of_birth: {
        type: Date
    },
    address: {
        type: Number,
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip_code: {
        type: String
    },
    number_of_request: {
        type: Number,
        default: 0,
    },
    clientVendor: {
        type: String
    },
    clientBrowser: {
        type: String
    },
    approved: {
        type: Boolean,
        default: false
    }
},
    {
        versionKey: false,
        timestamps: true
    });

module.exports = mongoose.model("users", userSchema);