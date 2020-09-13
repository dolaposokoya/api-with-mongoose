var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var jsonSchema = new Schema({
    profile_id: {
        type: String,
    },
    csv_file: {
        type: Array,
    },
});

module.exports = mongoose.model('json', jsonSchema);