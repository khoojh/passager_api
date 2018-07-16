// var router = require('express').Router();
// var logger = require('../../util/logger');
// var fs = require('fs');
// var _ = require('lodash');
// var samplePassages = require('../../data/samplePassages.json');
// var writePath = './server/data/samplePassages.json';
//
//
// var updateIDandDate = (req, res, next) => {
//     //need to improve on creating ID
//     req.body.id = samplePassages.passages.length + 1;
//     req.body.dateCreated = new Date();
//     next();
// }
//
// router.route('/')
//     .get((req, res) => {
//         res.status(200).send(samplePassages.passages);
//     })
//     .post(updateIDandDate, (req, res) => {
//         let newPassage = req.body;
//         samplePassages.passages.push(newPassage);
//         fs.writeFile(writePath, JSON.stringify(samplePassages), 'utf8', (err)=>{
//             if (err) {
//                 res.status(500).send(err);
//             } else {
//                 res.status(201).send(newPassage);
//             }
//         });
//     });
//
//
// router.route('/:passageid')
//     .get((req, res) => {
//         var passage = _.find(samplePassages.passages, {id: parseInt(req.params.passageid)});
//         if (passage) {
//             res.status(200).send(passage);
//         } else {
//             res.status(404).send("Passage not found.");
//         }
//     })
//     .patch((req, res) => {
//         var update = req.body;
//         if (update.id) {
//             delete update.id;
//         }
//         var index = _.findIndex(samplePassages.passages, {id: parseInt(req.params.passageid)});
//         if (!samplePassages.passages[index]) {
//             res.send();
//         } else {
//             var updatedPassage = _.assign(samplePassages.passages[index], update);
//         }
//         fs.writeFile(writePath, JSON.stringify(samplePassages), 'utf8', (err)=>{
//             if (err) {
//                 res.status(500).send(err);
//             } else {
//                 res.status(200).send(updatedPassage);
//             }
//         });
//     })
//     .delete((req, res) => {
//         var index = _.findIndex(samplePassages.passages, {id: parseInt(req.params.passageid)});
//         if (!samplePassages.passages[index]) {
//             res.send();
//         } else {
//             var deletedPassage = samplePassages.passages[index];
//             samplePassages.passages.splice(index, 1);
//         }
//
//         fs.writeFile(writePath, JSON.stringify(samplePassages), 'utf8', (err)=>{
//             if (err) {
//                 res.status(500).send(err);
//             } else {
//                 res.status(200).send(deletedPassage);
//             }
//         });
//     });
//
//
// module.exports = router;

var router = require('express').Router();
var controller = require('./passageController');
var createRoutes = require('../../util/createRoutes');

createRoutes(controller, router);

module.exports = router;
