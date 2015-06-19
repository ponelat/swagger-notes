var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');

var spec = require('./base.json');

var app = express();

function clone(a) {
   return JSON.parse(JSON.stringify(a));
}

// app.use('/special',function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   //res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "origin,josh, authorization, x-requested-with, content-type, accept");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Max-Age", "1728000");
//   next();
// });

// app.use(cookieParser());

app.use(function (req, res, next) {
  console.log(req.rawHeaders);
  next();
});


// app.use(cors({
// 	origin: 'http://localhost:3100',
// 	allowedHeaders: 'origin, josh,authorization, x-requested-with, content-type, accept',
// 	credentials: true,
// 	preflightContinure: true
// }));

// app.get('/bearer', function(req,res) {
//   console.log(req.headers);
// 	if(req.headers.authorization === 'Bearer josh') {
// 		res.setHeader('content-type', 'application/json');
// 		res.json(spec);
// 	}
// 	else {
//     res.send(401);
// 	}

// });

app.use(cookieParser());
app.get('/makecookie', function(req,res) {
	var new_cookie = 'random' + Math.ceil(Math.random()*1000);
	res.cookie('swagger', new_cookie);
	var str = 'Set-Cookie: "swagger='+ new_cookie + '"       Cookie: "swagger='+ req.cookies.swagger + '"';

	//res.status(200).send('Set-Cookie: "'+ new_cookie + '"       Cookie: "'+ req.cookies.swagger + '"');
	var cookie_spec = clone(spec);
	cookie_spec.info.description = str;
	cookie_spec.info.title = 'Cookies!';

	res.status(200).json(cookie_spec);
});


app.get('/cookie', function(req,res) {
	var str = 'Set-Cookie: nothing       Cookie: "swagger='+ req.cookies.swagger + '"';
	var cookie_spec = clone(spec);
	cookie_spec.info.description = str;
	cookie_spec.info.title = 'Cookies!';

	res.status(200).json(cookie_spec);
});

app.use(express.static(__dirname));

var server = app.listen(3100, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

