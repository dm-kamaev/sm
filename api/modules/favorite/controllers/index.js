var express = require('express'),
    router = express.Router();

const favoritesController = require('./favoritesController');

router.post('/favorite', favoritesController.create);
router.delete('/favorite', favoritesController.delete);
