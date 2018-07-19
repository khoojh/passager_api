var User = require('../api/user/userModel');
var signToken = require('./auth').signToken;

exports.signin = (req, res, next) => {
    var token = signToken(req.user._id);
    res.json({ token: token });
};
