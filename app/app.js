var express = require('express');
var app = express();
var reload = require('reload');
var dataFile = require('./data/passages.json')
var bodyParser = require('body-parser');
var cors = require('cors');


app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(cors());

app.route('/api/passages').get((req, res) => {
    res.send(dataFile.passages);
});

app.route('/api/passages/:passageid').get((req, res) => {
    res.send(dataFile.passages[req.params.passageid]);
});

app.route('/api/passages').post((req, res) => {
    console.log("REQBODY", req.body)
    //HANDLE POST
    //Assign id for passage and return
    res.send(201, req.body);
});

app.route('/api/passages/:passageid').patch((req, res) => {
    //HANDLE PATCH
    res.send(200, req.body);
});

app.route('/api/passages/:passageid').delete((req, res) => {
    //HANDLE DELETE
    res.sendStatus(204);
});


var server = app.listen(app.get('port'), function() {
    console.log("Listening on port " + app.get('port'));
});

reload(app, server);
