var superagent = require('superagent');
var request = require('request');

module.exports = {
	getWeather:function(req,res){
		request({
			url:'http://apis.baidu.com/heweather/weather/free?city=hangzhou',
			headers: {
				"apikey":"247d33366c891e82514590c622c6a81c"
			}
		},function(err,response,body){
			res.send(body)
		})
	}
}