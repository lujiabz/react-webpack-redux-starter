var superagent = require('superagent');
var cheerio = require('cheerio');
var Promise = require('bluebird');

var qqUrl = "http://v.qq.com/movielist/10001/0/0/0/0/14/0/0/-1.html";


module.exports = {
    vqq:function(){
        return new Promise(function(resolve,reject){
            superagent.get(qqUrl)
                .end(function (err, res) {
                    if (err) return reject(err);
                    var $ = cheerio.load(res.text);
                    var items = [];

                    $('#content li > a').each(function (idx, element) {
                        var href = element.attribs.href;
                        var title = element.attribs.title;
                        var img = element.children[1].attribs.src;
                        items.push({
                            title: title,
                            href: href,
                            img: img
                        });
                        return resolve(items)
                    });
                })
        })
    }
}