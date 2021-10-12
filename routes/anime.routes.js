const express = require('express');
const router = express.Router();
const anime = require('../controller/anime.controller');
const checkAuth = require('../middleware/checkAuth')

router.post('/', checkAuth, anime.create);
router.get('/', anime.getAll);
router.get('/:id', anime.getOne);
router.put('/:id',checkAuth, anime.update);
router.delete('/:id',checkAuth, anime.delete);

module.exports = router;
