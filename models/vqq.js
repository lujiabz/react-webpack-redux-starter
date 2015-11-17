var mongoose = require("mongoose");
var db = require("../database").db;

var Schema = mongoose.Schema;

var Vqq = new Schema({
	title:String,
	href:String,
	img: String
});

module.exports = db.model("vqq",Vqq);