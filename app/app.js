var express = require('express');
var app = express();
var reload = require('reload');
var dataFile = require('./data/passages.json')
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');

var samplePassages = require('./data/samplePassages.json')


app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(cors());

app.route('/api/passages').get((req, res) => {
    res.send(samplePassages.passages);
});

app.route('/api/passages/:passageid').get((req, res) => {
    res.send(samplePassages.passages[req.params.passageid]);
});

app.route('/api/passages').post((req, res) => {
    let newPassage = req.body;
    newPassage.id = samplePassages.passages.length;
    samplePassages.passages.push(newPassage);
    fs.writeFile('./app/data/samplePassages.json', JSON.stringify(samplePassages), 'utf8', (err)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(newPassage);
        }
    });
});

app.route('/api/passages/:passageid').patch((req, res) => {
    // let newPassages = [];
    // let newPassage;
    // samplePassages.passages.forEach((passage) => {
    //     if (passage.id === req.params.passageid) {
    //         newPassage = req.body;
    //         newPassage.id = passage.id;
    //         newPassages.push(newPassage);
    //     } else {
    //         newPassages.push(passage);
    //     }
    // })
    // fs.writeFile('./app/data/samplePassages.json', JSON.stringify(samplePassages), 'utf8', (err)=>{
    //     if (err) {
    //         res.status(500).send(err);
    //     } else {
    //         res.status(200).send(newPassage);
    //     }
    // });
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
