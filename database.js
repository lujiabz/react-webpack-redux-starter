var mongoose = require('mongoose');
var db = mongoose.createConnection();

var host, database, port, options;

if (process.env.SERVER_SOFTWARE == 'bae/3.0') {
    host = 'mongo.duapp.com';
    database = 'ncJpnNORbOeQMehbTXep';
    port = 8908;
    options = {
        server: {poolSize: 5},
        user: '0D3dd7950cbddde51845e4d353050c0a',
        pass: 'F77ecdb28b252895cef07290abec2360',
    };
} else {
    host = 'localhost';
    database = 'home';
    port = 27017;
}

module.exports = {
    db: db,
    init: function(){
        db.on('error', function(err) {
            //do something..
            console.log("connect error");
        });
        //断线重连.
        db.on('disconnected', function() {
            db.open(host, database, port, options);
        });

        db.open(host, database, port, options);
    }
}