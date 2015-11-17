var User = require('../models/user');
var fs = require('fs');
var passport = require('passport');
var crypto = require('crypto');

module.exports = {
	login:function(req,res){
		fs.readFile("public/www/login.html","utf-8",function(err,data){
			res.send(data);
	  	})	
	},
	register:function(req,res){		
		fs.readFile("public/www/register.html","utf-8",function(err,data){
			res.send(data);
	  	})
	},
	logout:function(req,res){
		req.logout();
  		res.redirect('/login');
	},
	signup:function(req,res){
		var username = req.body.username;
		var password = req.body.password;

		if(username == "" || password == ""){
			return res.send({ code:-1,message:"用户名或者密码为空"})
		}

		User.findOne({username:username},function(err,doc){
			if(err) return next(err);
			if(doc){
				return res.send({code:-1,message:"用户已经存在！"});
			}
			if(!doc){
				var sha1 = crypto.createHash("sha1");
				sha1.update(password);
				var hash = sha1.digest("hex");
				var user = new User({
		          	"username":username,
					"password":hash
		        });
		        user.save(function(err) {
		          	if (err) return next(err);
		          	res.send({ code:0,message: '注册成功' });
		        });
			}
		})
	},
	signin:function(req,res,next){
		passport.authenticate('local', function(err, user, info) {
		    if (err) { return next(err); }
		    if (!user) {
		    	if(info.message == "Missing credentials"){
		    		return res.send({code:-1,message:"用户名或者密码为空"});
		    	}else{
		    		return res.send({code:-1,message:info.message}); 
		    	}
		    }
		    req.logIn(user, function(err) {
		      	if (err) { return next(err); }
		      	return res.send({code:0,message:"认证成功"});
			});
	  	})(req, res, next);
	},
	userinfo:function(req,res){
		res.send(req.user.username);
	}
}