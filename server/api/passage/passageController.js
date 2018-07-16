var Passage = require('./passageModel');
var _ = require('lodash');

exports.params = (req, res, next, id) => {
    Passage.findById(id)
        // .populate('author book')
        // .exec()
        .then((passage) => {
            if (!passage) {
                next(new Error("No passage with that id"));
            } else {
                req.passage = passage;
                next();
            }
        }, (err) => {
            next(err);
        });
};

exports.get = (req, res, next) => {
    Passage.find({})
        // .populate('author book')
        // .exec()
        .then((passages) => {
            res.status(200).send(passages);
        }, (err) => {
            next(err);
        });
};

exports.getOne = (req, res, next) => {
    res.status(201).send(req.passage);
};

exports.put = (req, res, next) => {
    var passage = req.passage;
    var update = req.body;
    _.merge(passage, update);
    passage.save((err, saved) => {
        if (err) {
            next(err);
        } else {
            res.status(200).send(saved);
        }
    });
};

exports.post = (req, res, next) => {
    var newPassage = req.body;
    Passage.create(newPassage)
        .then((passage) => {
            res.status(200).send(passage);
        }, (err) => {
            next(err);
        });
};

exports.delete = (req, res, next) => {
    req.passage.remove((err, removed) => {
        if (err) {
            next(err);
        } else {
            res.status(200).send(removed);
        }
    });
};
