var Account = require('../models/account');
var moment = require('moment');

module.exports = {
	list:function(req,res){
		Account.find()
			.exec(function(err,doc){
				res.send(doc)
			})
	},
	add:function(req,res){
		var name = req.body.name;
		var money = req.body.money;
		var time = new Date().getTime();
		
		Account.create({time:time,name:name,money:money},function(err,doc){
			if(err) return res.send({code: -1});
			res.send({
				code: 0,
				data: doc
			})
		})
	},
	del:function(req,res){
		var id = req.body.id;

		Account.findOne({_id:id},function(err,doc){		
			doc.remove(function(){
				res.send({code:0,message:"删除成功！"});
			});
			
		})
	}
}