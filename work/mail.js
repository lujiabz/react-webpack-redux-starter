var nodemailer = require('nodemailer');
var Promise = require('bluebird');

var smtpTransport = nodemailer.createTransport("SMTP",{
	host: "smtp.163.com",
	secureConnection: true, // use SSL
	port: 465, // port for secure SMTP
	auth: {
		user: "lujiabz@163.com",
		pass: "zzWang^Yi@%Kk2@"
	}
});

module.exports = {
    sendMail:function(user,subject,info){

        return new Promise(function(resolve,reject){
            var mailOptions = {
                from: 'lujiabz<lujiabz@163.com>', // sender address 
                to: user, // list of receivers 
                subject: subject, // Subject line 
                text: info // plaintext body 
            };
            smtpTransport.sendMail(mailOptions, function(error, info){
                if(error){
                    return reject(error);
                }
                resolve(info);
            });
        })
        
    }
}