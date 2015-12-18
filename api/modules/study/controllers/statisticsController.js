var services = require.main.require('./app/components/services').all;

var async = require('asyncawait/async');
var await = require('asyncawait/await');

/**
 * @api {get} api/study/subject Get subject list
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName ListSubjects
 */
exports.listSubjects = async (function(req, res) {
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
 * @api {post} api/study/:id/addeducational Add educational data for school
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName AddEducationalData
 * @apiParamExample {json} Request-Example:
 *     {
 *         "egeData": [
 *             {
 *                 "data": {
 *                     "year": 2015,
 *                     "result": 70.2
 *                 },
 *                 "subject_id": 3
 *             }
 *         ],
 *         "giaData": [
 *             {
 *                 "data": {
 *                     "count": 61,
 *                     "result": 3.605
 *                 },
 *                 "subject_id": 3
 *              }
 *         ],
 *         "olimpData": [
 *             {
 *                 "data": {
 *                     "type": "всероссийская",
 *                     "stage": 3,
 *                     "class": 9,
 *                     "status": "победитель",
 *                     "year": 2015
 *                 },
 *                 "subject_id": 3
 *             }
 *         ]
 *     }
 */
exports.addEducationalData = async(function(req, res) {
    var result = {};
    try {
        var school_id = req.params.id,
            egeData = JSON.parse(req.body.data).egeData,
            giaData = JSON.parse(req.body.data).giaData,
            olimpData = JSON.parse(req.body.data).olimpData;

        if (egeData) {
            result.ege = [];

            egeData.forEach(ege => {
                var subject_id = ege.subject_id;
                var data = ege.data;
                result.ege.push(
                    await(services.egeResult.add(school_id, subject_id, data))
                );
            });
        }

        if (giaData) {
            result.gia = [];

            giaData.forEach(gia => {
                var subject_id = gia.subject_id;
                var data = gia.data;
                result.gia.push(
                    await(services.giaResult.add(school_id, subject_id, data))
                );
            });
        }

        if (olimpData) {
            result.olimp = [];

            olimpData.forEach(olimp => {
                var subject_id = olimp.subject_id;
                var data = olimp.data;
                result.olimp.push(
                    await(services.olimpResult.add(school_id, subject_id, data))
                );
            });
        }

    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {post} api/ege/:id Update ege result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName UpdateEge
 * @apiParamExample {json} Request-Example:
 *     {
 *         "egeData" : {
 *              "year": 2015,
 *              "result": 70.2
 *         }
 *     }
 */
exports.updateEge = async(function(req, res) {
    var result = '';
    try {
        var ege_id = req.params.id,
            data = JSON.parse(req.body.data).egeData;
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
 * @api {get} api/ege Get ege result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName GetEge
 */
exports.getEge = async(function(req, res) {
    var result = '';
    try {
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
 * @api {get} api/ege/:id Get ege result by id
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName GetEgeById
 */
exports.getEgeById = async(function(req, res) {
    var result = '';
    try {
        var ege_id = req.params.id;
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
 * @api {post} api/study/deleteege Delete ege result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName DeleteEge
 * @apiParamExample {json} Request-Example:
 *     {
 *         "egeData" : {
 *              "id": [10, 11],
 *              "year": 2015,
 *              "result": 70.2
 *         }
 *     }
 */
exports.deleteEge = async(function(req, res) {
    var result = '';
    try {
        data = JSON.parse(req.body.data).egeData;
        result = await(services.egeResult.delete(data));
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});




/**
 * @api {post} api/gia/:id Update gia result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName UpdateGia
 * @apiParamExample {json} Request-Example:
 *     {
 *         "giaData" : {
 *              "count": 61,
 *              "result": 3.605
 *         }
 *     }
 */
exports.updateGia = async(function(req, res) {
    var result = '';
    try {
        var gia_id = req.params.id,
            data = JSON.parse(req.body.data).giaData;
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
 * @api {get} api/gia Get gia result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName GetGia
 */
exports.getGia = async(function(req, res) {
    var result = '';
    try {
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
 * @api {get} api/gia/:id Get gia result by id
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName GetGiaById
 */
exports.getGiaById = async(function(req, res) {
    var result = '';
    try {
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
 * @api {post} api/study/deletegia Delete gia result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName DeleteGia
 * @apiParamExample {json} Request-Example:
 *     {
 *         "giaData" : {
 *              "id": [10, 11],
 *              "count": 61,
 *              "result": 3.605,
 *         }
 *     }
 */
exports.deleteGia = async(function(req, res) {
    var result = '';
    try {
        data = JSON.parse(req.body.data).giaData;
        result = await(services.giaResult.delete(data));
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {post} api/olimp/:id Update olimp result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName UpdateOlimp
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
exports.updateOlimp = async(function(req, res) {
    var result = '';
    try {
        var olimp_id = req.params.id,
            data = JSON.parse(req.body.data).olimpData;
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
 * @api {get} api/olymp Get olimp result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName GetOlymp
 */
exports.getOlymp = async(function(req, res) {
    var result = '';
    try {
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
 * @api {get} api/olymp/:id Get olimp result by id
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName GetOlympById
 */
exports.getOlympById = async(function(req, res) {
    var result = '';
    try {
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
 * @api {post} api/study/deleteolimp Delete olimp result
 * @apiVersion 0.0.0
 * @apiGroup Statistics
 * @apiName DeleteOlimp
 * @apiParamExample {json} Request-Example:
 *     {
 *         "olimpData" : {
 *              "id": [10, 11],
 *              "count": 61,
 *              "result": 3.605,
 *         }
 *     }
 */
exports.deleteOlimp = async(function(req, res) {
    var result = '';
    try {
        data = JSON.parse(req.body.data).olimpData;
        result = await(services.olimpResult.delete(data));
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});
