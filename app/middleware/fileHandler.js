'use strict';

const multer = require('multer');
const fileStorage = multer.memoryStorage();

module.exports = multer({storage: fileStorage});
