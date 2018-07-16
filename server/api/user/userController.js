var User = require('./userModel');
var _ = require('lodash');

exports.params = (req, res, next, id) => {
    User.findById(id)
        .then((user) => {
            if (!user) {
                next(new Error("No user with that id"));
            } else {
                req.user = user;
                next();
            }
        }, (err) => {
            next(err);
        });
};

exports.get = (req, res, next) => {
    User.find({})
        .then((users) => {
            res.json(users);
        }, (err) => {
            next(err);
        });
};

exports.getOne = (req, res, next) => {
    res.json(req.user);
};

exports.put = (req, res, next) => {
    var user = req.user;
    var update = req.body;
    _.merge(user, update);
    user.save((err, saved) => {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    });
};

exports.post = (req, res, next) => {
    var newUser = req.body;
    User.create(newUser)
        .then((user) => {
            res.json(user);
        }, (err) => {
            next(err);
        });
}


exports.delete = (req, res, next) => {
    req.user.remove((err, removed) => {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};
