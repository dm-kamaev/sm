var express = require('express'),
    router  = express.Router();

var statisticsController = require('./statisticsController');

router.get('/study/subject/', statisticsController.listSubjects);
router.get('/school/:school_id/egeresult', statisticsController.getEgeResult);
router.get('/school/:school_id/egeresult/:id', statisticsController.getEgeResultById);
router.get('/school/:school_id/giaresult', statisticsController.getGiaResult);
router.get('/school/:school_id/giaresult/:id', statisticsController.getGiaResultById);
router.get('/school/:school_id/olympresult', statisticsController.getOlympResult);
router.get('/school/:school_id/olympresult/:id', statisticsController.getOlympResultById);

router.post('/school/:school_id/subject/:id/egeresult', statisticsController.addEgeResult);
router.post('/school/:school_id/subject/:id/giaresult', statisticsController.addGiaResult);
router.post('/school/:school_id/subject/:id/olympresult', statisticsController.addOlympResult);

router.put('/school/:school_id/egeresult/:id', statisticsController.updateEgeResult);
router.put('/school/:school_id/giaresult/:id', statisticsController.updateGiaResult);
router.put('/school/:school_id/olympresult/:id', statisticsController.updateOlimpResult);

router.delete('/school/:school_id/egeresult/:id', statisticsController.deleteEgeResult);
router.delete('/school/:school_id/giaresult/:id', statisticsController.deleteGiaResult);
router.delete('/school/:school_id/olympresult/:id', statisticsController.deleteOlympResult);

module.exports = router;
