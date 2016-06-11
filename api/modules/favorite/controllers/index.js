var express = require('express');
var router = express.Router();

const favoritesController = require('./favoritesController');

router.delete('/favorite', favoritesController.delete);
router.post('/favorite', favoritesController.create);

module.exports = router;
