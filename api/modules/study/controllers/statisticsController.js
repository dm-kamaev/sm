var services = require.main.require('./app/components/services').all;

var async = require('asyncawait/async');
var await = require('asyncawait/await');

/**
 * @api {get} api/study/subject Get subject list
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName ListSubjects
 */
exports.listSubjects = async(function(req, res) {
    var result;
    try {
        result = await(services.subject.list());
    } catch (e) {
        console.log(e.message);
        result = e;
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {get} api/school/:school_id/egeresult Get ege result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName GetEgeResult
 */
exports.getEgeResult = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.school_id;
        // school_id dont used
        result = await(services.egeResult.getAll());
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {get} api/school/:school_id/egeresult/:id Get ege result by id
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName GetEgeById
 */
exports.getEgeResultById = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.school_id;
        var ege_id = req.params.id;
        // school_id dont used
        result = await(services.egeResult.getById(ege_id));
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {get} api/school/:school_id/giaresult Get gia result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName GetGiaResult
 */
exports.getGiaResult = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.school_id;
        // school_id dont used
        result = await(services.giaResult.getAll());
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {get} api/school/:school_id/giaresult/:id Get gia result by id
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName GetGiaById
 */
exports.getGiaResultById = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.school_id;
        // school_id dont used
        var gia_id = req.params.id;
        result = await(services.giaResult.getById(gia_id));
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {get} api/school/:school_id/olympresult Get olimp result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName GetOlymp
 */
exports.getOlympResult = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.school_id;
        // school_id dont used
        result = await(services.olimpResult.getAll());
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {get} api/school/:school_id/olympresult/:id Get olimp result by id
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName GetOlympById
 */
exports.getOlympResultById = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.school_id;
        // school_id dont used
        olimp_id = req.params.id;
        result = await(services.olimpResult.getById(olimp_id));
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});



/**
 * @api {post} api/school/:school_id/subject/:id/egeresult Add ege_result data
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName AddEgeResult
 * @apiParamExample {json} Request-Example:
 *     {
 *         "egeData": {
 *                 "year": 2015,
 *                 "result": 70.2
 *          }
 *     }
 */
exports.addEgeResult = async(function(req, res) {
    var result = {};
    try {
        var school_id = req.params.school_id;
        var subject_id = req.params.id,
            data = req.body.egeData;
        result = await(services.egeResult.add(school_id, subject_id, data));
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {post} api/school/:school_id/subject/:id/giaresult Add gia result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName AddGiaResult
 * @apiParamExample {json} Request-Example:
 *     {
 *         "giaData": {
 *             "count": 61,
 *             "result": 3.605
 *         }
 *     }
 */
exports.addGiaResult = async(function(req, res) {
    var result = {};
    try {
        var school_id = req.params.school_id;
        var subject_id = req.params.id;
        var data = req.body.giaData;
        result = await(services.giaResult.add(school_id, subject_id, data));
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {post} api/school/:school_id/subject/:id/olympresult Add olymp result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName AddOlympResult
 * @apiParamExample {json} Request-Example:
 *     {
 *         "olympData": {
 *             "type": "всероссийская",
 *             "stage": 3,
 *             "class": 9,
 *             "status": "победитель",
 *             "year": 2015
 *          }
 *     }
 */
exports.addOlympResult = async(function(req, res) {
    var result = {};
    try {
        var school_id = req.params.school_id;
        var subject_id = req.params.id,
        var data = req.body.olympData;
        result = await(services.olimpResult.add(school_id, subject_id, data))
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {put} api/school/:school_id/giaresult/:id Update ege result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName UpdateEgeResult
 * @apiParamExample {json} Request-Example:
 *     {
 *         "egeData" : {
 *              "year": 2015,
 *              "result": 70.2
 *         }
 *     }
 */
exports.updateEgeResult = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.id;
        // school_id dont used
        var ege_id = req.params.id;
        var data = req.body.egeData;
        result = await(services.egeResult.update(ege_id, data));
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {put} api/school/:school_id/giaresult/:id Update gia result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName UpdateGiaResult
 * @apiParamExample {json} Request-Example:
 *     {
 *         "giaData" : {
 *              "count": 61,
 *              "result": 3.605
 *         }
 *     }
 */
exports.updateGiaResult = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.id;
        // school_id dont used
        var gia_id = req.params.id;
        var data = req.body.giaData;
        result = await(services.giaResult.update(gia_id, data));
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {put} api/school/:school_id/olimpresult/:id Update olimp result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName UpdateOlimpResult
 * @apiParamExample {json} Request-Example:
 *     {
 *         "olimpData" : {
 *              "type": "всероссийская",
 *              "stage": 3,
 *              "class": 9,
 *              "status": "победитель",
 *              "year": 2015
 *         }
 *     }
 */
exports.updateOlimpResult = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.id;
        // school_id dont used
        var olimp_id = req.params.id;
        var data = req.body.olimpData;
        result = await(services.olimpResult.update(olimp_id, data));
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {delete} api/school/:school_id/egeresult/:id Delete ege result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName DeleteEgeResult
 */
exports.deleteEgeResult = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.school_id;
        var ege_id = req.params.id;
        result = await(services.egeResult.delete(school_id, ege_id));
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {delete} api/school/:school_id/giaresult/:id Delete gia result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName DeleteGiaResult
 */
exports.deleteGiaResult = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.school_id;
        var gia_id = req.params.id;
        result = await(services.giaResult.delete(school_id, gia_id));
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {delete} api/school/:school_id/olympresult/:id Delete olimp result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName DeleteOlimpResult
 */
exports.deleteOlympResult = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.school_id;
        var olymp_id = req.params.id;
        result = await(services.olimpResult.delete(school_id, olymp_id));
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});
