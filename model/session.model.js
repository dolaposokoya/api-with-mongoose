const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    user_id: {
        type: String,
        required: false,
        unique: false,
    },
    token: {
        type: String,
        required: false,
        unique: false,
    },
    status: {
        type: String,
        required: false,
        default: 1,
    }
},
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = mongoose.model("sessions", sessionSchema);

