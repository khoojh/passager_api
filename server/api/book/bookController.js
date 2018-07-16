var Book = require('./bookModel');
var _ = require('lodash');

exports.params = (req, res, next, id) => {
    Book.findById(id)
        .populate('book')
        .exec()
        .then((book) => {
            if (!book) {
                next(new Error("No book with that id"));
            } else {
                req.book = book;
                next();
            }
        }, (err) => {
            next(err);
        });
};

exports.get = (req, res, next) => {
    Book.find({})
        .populate('book')
        .exec()
        .then((books) => {
            res.json(books);
        }, (err) => {
            next(err);
        });
};

exports.getOne = (req, res, next) => {
    res.json(req.book);
};

exports.put = (req, res, next) => {
    var book = req.book;
    var update = req.body;
    _.merge(book, update);
    book.save((err, saved) => {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    });
};

exports.post = (req, res, next) => {
    var newBook = req.body;
    Book.create(newBook)
        .then((book) => {
            res.json(book);
        }, (err) => {
            next(err);
        });
}


exports.delete = (req, res, next) => {
    req.book.remove((err, removed) => {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};
