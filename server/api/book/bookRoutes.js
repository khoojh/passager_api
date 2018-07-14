var router = require('express').Router();
var logger = require('../../util/logger');


router.route('/')
    .get((req, res) => {
        logger.log('Hey from book!');
        res.send({ok: true});
    })


module.exports = router;
