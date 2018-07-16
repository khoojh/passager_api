var express = require('express');
var app = express();
var api = require('./api/api');
var error = require('./middleware/error');
// var connect = require('./db');

// setup app middleware
require('./middleware/appMiddleware')(app);
require('./db')();

// setup api
app.use('/api', api);

// setup global error handling
app.use(error());

// export app for testing
module.exports = app;
