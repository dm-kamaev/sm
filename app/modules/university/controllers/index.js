'use strict';

const express = require('express');
const router = express.Router();

const universityController = require('./universityController');

router.get('/university', universityController.information);

module.exports = router;
