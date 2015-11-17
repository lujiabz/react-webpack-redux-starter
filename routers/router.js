var User = require('./user');
var fs = require('fs');
var Movies = require('./movies');
var Weather = require('./weather');
var Mail = require('./mail');
var Account = require('./account');


module.exports = {
	index:function(req,res){
		console.log(req.isAuthenticated())
		fs.readFile("public/www/index.html","utf-8",function(err,data){
			res.send(data);
	  	})
	},
	user: User,
	movies: Movies,
	weather: Weather,
	mail: Mail,
	account: Account
}