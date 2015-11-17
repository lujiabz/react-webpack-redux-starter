var schedule = require('node-schedule');
var mail = require('./mail');
var pc = require('./pc');
var Vqq = require('../models/vqq');
	
var rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [0, new schedule.Range(1, 6)];
// rule.hour = 20;
// rule.minute = 0;
// var j = schedule.scheduleJob(rule, function(){
// 	console.log("执行任务");
// });
rule.minute = 31;
var j = schedule.scheduleJob(rule, function(){

	//发送邮件
　　mail.sendMail("lumiab@yeah.net","测试接口","哈哈哈哈，想不想来个定时发送 -- " + new Date().toLocaleString())
		.then(function(){
			console.log("发送成功 " + new Date().toLocaleString())
		})
		.catch(function(e){
			console.log(e)
		})
	//qq视频爬虫
	pc.vqq().then(function(data){
		Vqq.remove(function(err){
			if(err) throw err;
		 	Vqq.create(data,function(err){

			});
		}); 
	});
});

//qq视频爬虫
pc.vqq().then(function(data){
	Vqq.remove(function(err){
		if(err) throw err;
	 	Vqq.create(data,function(err){

		});
	}); 
});



