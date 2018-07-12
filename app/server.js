var express = require('express');
var app = express();
var reload = require('reload');
var morgan = require('morgan');
var dataFile = require('./data/passages.json');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var _ = require('lodash');
var samplePassages = require('./data/samplePassages.json');
var passageRouter = require('./routes/passages.js');

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use('/passages', passageRouter);
app.use((err, req, res, next) => {
    if (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//Comment out the following section for testing purposes
//==============================================================================
var server = app.listen(app.get('port'), function() {
    console.log("Listening on port " + app.get('port'));
});

reload(app, server);
//==============================================================================

//Uncomment the following section for testing purposes
//==============================================================================
module.exports = app;
//==============================================================================
