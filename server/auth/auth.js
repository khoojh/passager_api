var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var config = require('../config/config');
var checkToken = expressJwt({ secret: config.secrets.jwt });
var User = require('../api/user/userModel');

exports.decodeToken = () => {
    return (req, res, next) => {
        // make it optional to place token on query string
        // if it is, place it on the headers where it should be so checkToken
        // can see it. Follow the 'Bearer 87364123' format so checkToken can
        // see it and decode it
        if (req.query && req.query.hasOwnProperty('access_token')) {
            req.headers.authorization = 'Bearer ' + req.query.access_token;
        }

        // this will call next if token is valid and send error if not
        // it will attach the decoded token to req.user
        checkToken(req, res, next);
    };
};

exports.getFreshUser = () => {
    return (req, res, next) => {
        User.findById(req.user._id)
            .then((user) => {
                if (!user) {
                    res.status(401).send('Unauthorized');
                } else {
                    req.user = user;
                    next();
                }
            }, (err) => {
                next(err);
            });
    };
}

exports.verifyUser = () => {
    return (req, res, next) => {
        var username = req.body.username;
        var password = req.body.password;

        if (!username || !password) {
            // no username or password
            res.status(400).send('No username or password');
            return;
        }

        User.findOne({ username: username })
            .then((user) => {
                if (!user) {
                    // username not found
                    res.status(401).send('No user with the username');
                } else {
                    if (!(user.authenticate(password))) {
                        // wrong password
                        res.status(401).send('Wrong password');
                    } else {
                        // correct password
                        req.user = user;
                        next();
                    }
                }
            }, (err) => {
                next(err);
            });
    };
};

exports.signToken = (id) => {
    return jwt.sign(
        { _id: id },
        config.secrets.jwt,
        { expiresIn: config.expireTime }
    );
}
