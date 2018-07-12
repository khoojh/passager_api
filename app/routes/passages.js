var express = require('express');
var passageRouter = express.Router();
var fs = require('fs');
var _ = require('lodash');
var samplePassages = require('../data/samplePassages.json');


var updateID = (req, res, next) => {
    //need to improve on creating ID
    req.body.id = samplePassages.passages.length + 1;
    next();
}

passageRouter.route('/')
    .get((req, res) => {
        res.status(200).send(samplePassages.passages);
    })
    .post(updateID, (req, res) => {
        let newPassage = req.body;
        // newPassage.id = samplePassages.passages.length; //Modify this to the id of the last element + 1
        samplePassages.passages.push(newPassage);
        fs.writeFile('./app/data/samplePassages.json', JSON.stringify(samplePassages), 'utf8', (err)=>{
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send(newPassage);
            }
        });
    });

passageRouter.route('/:passageid')
    .get((req, res) => {
        var passage = _.find(samplePassages.passages, {id: parseInt(req.params.passageid)});
        if (passage) {
            res.send(passage);
        } else {
            res.status(404).send("Passage not found.");
        }
    })
    .patch((req, res) => {
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
    })
    .delete((req, res) => {
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

module.exports = passageRouter;
