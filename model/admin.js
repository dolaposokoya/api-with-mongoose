var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var adminSchema = new Schema({
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
        default: 'admin'
    },
    profile_image: {
        type: Object,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
});


module.exports = mongoose.model("admin", adminSchema);