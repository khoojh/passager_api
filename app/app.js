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


app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.route('/api/passages').get((req, res) => {
    res.send(samplePassages.passages);
});

app.route('/api/passages/:passageid').get((req, res) => {
    var passage = _.find(samplePassages.passages, {id: parseInt(req.params.passageid)});
    res.send(passage);
});

app.route('/api/passages').post((req, res) => {
    let newPassage = req.body;
    newPassage.id = samplePassages.passages.length; //Modify this to the id of the last element + 1
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
    var update = req.body;
    if (update.id) {
        delete update.id;
    }
    var index = _.findIndex(samplePassages.passages, {id: parseInt(req.params.passageid)});
    if (!samplePassages.passages[index]) {
        res.send();
    } else {
        var updatedPassage = _.assign(samplePassages.passages[index], update);
    }
    fs.writeFile('./app/data/samplePassages.json', JSON.stringify(samplePassages), 'utf8', (err)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(updatedPassage);
        }
    });
});

app.route('/api/passages/:passageid').delete((req, res) => {
    var index = _.findIndex(samplePassages.passages, {id: parseInt(req.params.passageid)});
    if (!samplePassages.passages[index]) {
        res.send();
    } else {
        var deletedPassage = samplePassages.passages[index];
        samplePassages.passages.splice(index, 1);
    }

    fs.writeFile('./app/data/samplePassages.json', JSON.stringify(samplePassages), 'utf8', (err)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(deletedPassage);
        }
    });
});


var server = app.listen(app.get('port'), function() {
    console.log("Listening on port " + app.get('port'));
});

reload(app, server);
