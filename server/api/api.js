var router = require('express').Router();

router.use('/users', require('./user/userRoutes'));
router.use('/passages', require('./passage/passageRoutes'));

module.exports = router;
