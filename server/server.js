var express = require('express');
var mongoose = require('mongoose');
var app = express();

var port = process.env.port || 8080;

mongoose.connect('mongodb://localhost/minibedy'); // connect to mongo database named minibedy

// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

app.listen(port);
console.log('link to the application: http://localhost:', port);

module.exports = app;