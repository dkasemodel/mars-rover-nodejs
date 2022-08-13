const router = require('express').Router();
const exploreRoutes = require('./explore');

router.use('/explore', exploreRoutes);

module.exports = router;
