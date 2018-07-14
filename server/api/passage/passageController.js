var Passage = require('./passageModel');
var _ = require('lodash');

exports.params = (res, req, next, id) => {
    Passage.findById(id)
        .populate('author book')
        .exec()
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
        .populate('author book')
        .exec()
        .then((passages) => {
            res.json(passages);
        }, (err) => {
            next(err);
        });
};

exports.getOne = (res, req, next) => {
    res.json(req.passage);
};

exports.put = (res, req, next) => {
    var passage = req.passage;
    var update = req.body;
    _.merge(passage, update);
    passage.save((err, saved => {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    });
};

exports.post = (res, req, next) => {
    var newPassage = req.body;
    Passage.create(newPassage)
        .then((passage) => {
            res.json(passage);
        }, (err) => {
            next(err);
        });
};

exports.delete = (res, req, next) => {
    req.passage.remove((err, removed) => {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};
