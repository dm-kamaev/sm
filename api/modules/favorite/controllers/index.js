var express = require('express'),
    router = express.Router();

const favoritesController = require('./favoritesController');

router.delete('/favorite', favoritesController.delete);
router.post('/favorite', favoritesController.create);

module.exports = router;
