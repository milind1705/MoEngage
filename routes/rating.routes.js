const express = require('express');
const router = express.Router();
const rating = require('../controller/rating.controller');
const checkAuth = require('../middleware/checkAuth')

router.post('/:animeId', checkAuth, rating.addRating);
router.delete('/:id', checkAuth, rating.deleteRating);

module.exports = router;
