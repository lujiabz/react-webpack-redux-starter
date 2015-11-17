var Vqq = require('../models/vqq');

module.exports = {
	movieLists:function(req,res){
		var limit = req.query.limit || 12;
		console.log(req.query)
		Vqq.find()
			.limit(limit)
			.exec(function(err,doc){
				res.send(doc);
			});
		
	}
}