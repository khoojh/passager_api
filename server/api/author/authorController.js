var Author = require('./authorModel');
var _ = require('lodash');

exports.params = (req, res, next, id) => {
    Author.findById(id)
        .then((author) => {
            if (!author) {
                next(new Error("No author with that id"));
            } else {
                req.author = author;
                next();
            }
        }, (err) => {
            next(err);
        });
};

exports.get = (req, res, next) => {
    Author.find({})
        .then((authors) => {
            res.json(authors);
        }, (err) => {
            next(err);
        });
};

exports.getOne = (req, res, next) => {
    res.json(req.author);
};

exports.put = (req, res, next) => {
    var author = req.author;
    var update = req.body;
    _.merge(author, update);
    author.save((err, saved) => {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    });
};

exports.post = (req, res, next) => {
    var newAuthor = req.body;
    Author.create(newAuthor)
        .then((author) => {
            res.json(author);
        }, (err) => {
            next(err);
        });
}


exports.delete = (req, res, next) => {
    req.author.remove((err, removed) => {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};
