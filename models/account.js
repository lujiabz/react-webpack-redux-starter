var mongoose = require("mongoose");
var db = require("../database").db;

var Schema = mongoose.Schema;

var Account = new Schema({
	time:Number,
	name:String,
	money:Number	
});

module.exports = db.model("account",Account);