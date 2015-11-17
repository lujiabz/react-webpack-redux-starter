var mail = require('../work/mail');

module.exports = {
	sendMail:function(req,res){
		var to = req.body.to;
		var subject = req.body.subject;
		var text = req.body.text;

		//发送邮件
	　　mail.sendMail(to,subject,text)
			.then(function(){
				res.send({code:0,message:"发送成功！"});
				console.log("发送成功 " + new Date().toLocaleString())
			})
			.catch(function(e){
				res.send({code:-1,message:"发送失败！"});
				console.log(e)
			})
		
	}
}