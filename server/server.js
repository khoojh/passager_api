var express = require('express');
var app = express();
var api = require('./api/api');
var error = require('./middleware/error');

// setup app middleware
require('./middleware/appMiddleware')(app);

// setup api
app.use('/api', api);

// setup global error handling
app.use(error());


// export app for testing
module.exports = app;
