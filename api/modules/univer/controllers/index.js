var express = require('express'),
    router  = express.Router();

//var schoolController = require('./schoolController');
//
//router.get('/school', schoolController.list);
//router.get('/school/search', schoolController.search);
//router.get('/school/:id', schoolController.view);
// // router.post('/school', schoolController.create);
//router.post('/school/:id/comment', schoolController.createComment);
var statisticsController = require('./statisticsController');

router.get('/study/subject/', statisticsController.listSubjects);
router.post('/study/:id/addeducational', statisticsController.addEducationalData);

router.get('/ege', statisticsController.getEge);
router.get('/ege/:id', statisticsController.getEgeById);
router.post('/ege/:id', statisticsController.updateEge);
// router.post('/study/deleteege/', statisticsController.deleteEge);

router.get('/gia', statisticsController.getGia);
router.get('/gia/:id', statisticsController.getGiaById);
router.post('/gia/:id', statisticsController.updateGia);
// router.post('/study/deletegia/', statisticsController.deleteGia);

router.get('/olymp', statisticsController.getOlymp);
router.get('/olymp/:id', statisticsController.getOlympById);
router.post('/olimp/:id', statisticsController.updateOlimp);
// router.post('/study/deleteolimp/', statisticsController.deleteOlimp);

module.exports = router;
