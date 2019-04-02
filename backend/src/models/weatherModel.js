var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sequence = require('mongoose-sequence')(mongoose);

var weatherModel = new Schema({
    "id": Number,
    "city": {type: String, default: ""},
    "dateSaved": {type: Date, default: Date.now},
    "weather": String,
    "observation": String
},{ "id": false });

weatherModel.plugin(sequence,{inc_field: "id"});

module.exports = mongoose.model("Weather",weatherModel);