const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    mobile: { type: String, },
    date_of_birth: { type: Date },
    address: { type: String, },
    city: { type: String },
    state: { type: String },
    status: { type: Number, default: 0 },
    zip_code: { type: String },
    number_of_request: { type: Number, default: 0 },
    clientVendor: { type: String },
    clientBrowser: { type: String },
    approved: { type: Boolean, default: false },
    signedIn: { type: String },
}, {
    versionKey: false,
    timestamps: true
});

userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("users", userSchema);