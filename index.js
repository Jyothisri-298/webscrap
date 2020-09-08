var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var bodyParser = require('body-parser');  
//var urlencodedParser = bodyParser.urlencoded({ extended: false })  

var app = express();
app.use(bodyParser.json());

var headers = {
    'authority': 'www.amazon.in',
    'cache-control': 'max-age=0',
    'rtt': '1800',
    'downlink': '0.3',
    'ect': '2g',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'sec-fetch-site': 'none',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-user': '?1',
    'sec-fetch-dest': 'document',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'cookie': 'session-id=262-8255191-5728926; i18n-prefs=INR; ubid-acbin=260-3907007-3249546; session-token="Ee/hYq/Wk9WSZ7oqp+rgM6lJJuyz7Ree9mt1rJEULSNhEZqz3420srf8qypRh9pIotncN/52NReGJlieYyxAV3w0BqRCFepdEL3E9HY/1sNWtlV/Qd9nCmQJBLQ+X9zcY9HK2E3ZqMQLI2VhZ9048fwUMvHAIWm7O1IRYB5oK5LijAJocHgnn/ZVM766k9ItA1FO7yaXsVZaHftn8hjRcCYQxy9ATFTYGmN+0eduFEdWUjOBrY7hUw=="; csm-hit=adb:adblk_no&t:1599557906958&tb:s-6XXW0JE7DS6418TM3M11|1599557906198; visitCount=2; session-id-time=2082787201l'
};


app.post("/crawl", function(req, res){
   let url = req.body.url;
   var options = {
       url: url,
       headers: headers
   };

   // console.log(req.body);

   request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            $ = cheerio.load(body);
            let title = $('meta[name="title"]').attr('content');
            let desc = $('meta[name="description"]').attr('content');
            let landing_image = $('img[id="landingImage"]').attr('data-old-hires');
            let images = $('li span span span img').attr('src');

            console.log(title);
            console.log(desc);
            console.log(landing_image);
            console.log(images);

            let response = {"title":title, "description": desc, "images": [landing_image, images]}
            res.end(JSON.stringify(response));
        }
    });    
})


var server = app.listen(8000, function () {  
 console.log("App listening on port 8000")  ;
})