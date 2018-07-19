var express = require('express');
var app = express();
var api = require('./api/api');
var auth = require('./auth/routes');
var error = require('./middleware/error');
var config = require('./config/config');

// connect to db
require('mongoose').connect(config.db.url, { useNewUrlParser: true });

// seeding
if (config.seed) {
    require('./util/seed');
}

// setup app middleware
require('./middleware/appMiddleware')(app);
// require('./db')();

// setup api
app.use('/api', api);
app.use('/auth', auth);

// setup global error handling
app.use(error());

// export app for testing
module.exports = app;
