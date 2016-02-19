'use strict';

var app = require('./app'),
	db = require('./db');

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
var port = 8080;

var server = https.createServer(options, app).listen(port);	

// var server = app.listen(port, function () {
// 	console.log('HTTP server patiently listening on port', port);
// });

module.exports = server;