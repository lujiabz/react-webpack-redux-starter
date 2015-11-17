var mongoose = require("mongoose");
var db = require("../database").db;

var Schema = mongoose.Schema;

var _User = new Schema({
	username:String,
	password:String
});

module.exports = db.model("user",_User);