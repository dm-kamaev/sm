var services = require.main.require('./app/components/services').all;

var async = require('asyncawait/async');
var await = require('asyncawait/await');


/**
 * @api {get} api/school/apitest api test
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName Apitest
 * @apiParam {Object} searchParams Search params.
 * @apiParamExample {json} Request-Example:
 *     {
 *       'text' : 'test'
 *     }
 */
exports.yapi = async (function(req, res) {
    var result = '';
    try {
        var params = req.query;
        result = JSON.stringify(await(services.search.advancedSearch(params.text)));
    } catch (e) {
        console.log(e);
        result = e.message;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {post} api/school/createschool Creates school
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName Create
 * @apiParamExample {json} Request-Example:
 *     {
 *         'schoolData' : {
 *             'name': 'Общеобразовательная школа',
 *             'abbreviation': 'ГОУ СКОШ № 00',
 *             'fullName': 'Государственное образовательное учреждение',
 *             'schoolType': 'Школа',
 *             'director': 'Любимов Олег Вадимович',
 *             'phones': ['(495) 223-32-23', '(499)322-23-33'],
 *             'site': 'school.ru',
 *             'educationInterval': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
 *             'govermentKey': 100,
 *             'addresses': [{
 *                 'name':  'ул. Веткина, 2',
 *                 'coords': [55.802275, 37.624876],
 *                 'departments': [{
 *                     'stage': 'Начальное образование',
 *                     'name': 'Начальное образование',
 *                     'availability': [1, 0, 0]
 *                 }]
 *             }]
 *         }
 *     }
 */
exports.create = async (function(req, res) {
    var result = '';
    try {
        var data = req.body.schoolData;
        console.log('data', data);
        result = await(services.school.create(data));
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {put} api/school/:id/ Update school
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName Update
 * @apiParamExample {json} Request-Example:
 *     {
 *         'schoolData' : {
 *             'name': 'Общеобразовательная школа',
 *             'abbreviation': 'ГОУ СКОШ № 00',
 *             'fullName': 'Государственное образовательное учреждение',
 *             'schoolType': 'Школа',
 *             'director': 'Любимов Олег Вадимович',
 *             'phones': ['(495) 223-32-23', '(499)322-23-33'],
 *             'site': 'school.ru',
 *             'educationInterval': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
 *         }
 *     }
 */
exports.update = async (function(req, res) {
    var result = '';
    try {
        var school_id = req.params.id;
        var data = req.body.schoolData;
        result = await(services.school.update(school_id, data));
    } catch (e) {
        console.log(e);
        result = e.message;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {delete} api/school/:id Delete school
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName Delete
 */
exports.delete = async (function(req, res) {
    var result = '';
    try {
        var school_id = req.params.id;
        result = await(services.school.delete(school_id));
    } catch (e) {
        console.log(e);
        result = e.message;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {get} api/school Get school list
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName Schools
 * @apiSuccess {Object[]} schools Very userful documentation here.
 */
exports.list = async (function(req, res) {
    var schools = await (services.school.list());
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(JSON.stringify(schools));
});


/**
 * @api {get} api/school/:id Get school
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName School
 * @apiSuccess {Object} schools Very userful documentation here.
 */
exports.view = async (function(req, res) {
    var school = await(services.school.viewOne(req.params.id));
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(JSON.stringify(school));
});


/**
 * @api {get} api/school/:id/address Get school addresses
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName Addresses
 */
exports.getAddresses = async (function(req, res) {
    var result = '';
    try {
        var school_id = req.params.id;
        result = await(services.school.getAddresses(school_id));
    } catch (e) {
        console.log(e.message);
        result = e;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {get} api/school/:school_id/address/:id Get school address
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName Address
 */
exports.getAddress = async (function(req, res) {
    var result = '';
    try {
        var school_id = req.params.school_id;
        var address_id = req.params.id;
        var address =
                await(services.school.getAddress(school_id, address_id));
        if (address) {
            result = address;
        }
        else {
            result = 'School hasn\'t address with id ' + address_id;
        }
    } catch (e) {
        console.log(e.message);
        result = e;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
<<<<<<< HEAD
 * @api {post} api/school/:school_id/address/:id Update school address
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName UpdateAddress
 * @apiParamExample {json} Request-Example:
 *     {
 *         'addressData' : {
 *             'name': 'ул. Веткина, 2',
 *             'coords': [55.802275, 37.624876]
 *         }
 *     }
 */
exports.updateAddress = async (function(req, res) {
    var result = '';
    try {
        var school_id = req.params.school_id;
        var address_id = req.params.id;
        var data = JSON.parse(req.body.data).addressData;
        var address =
                await(services.school.getAddress(school_id, address_id));
        if (address) {
            result = await(address.update(data));
        }
        else {
            result = 'School hasn\'t address with id ' + address_id;
        }
    } catch (e) {
        console.log(e.message);
        result = e;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
=======
>>>>>>> BP-586 Change some methods in school controller
 * @api {get} api/school/search/filters Get school type list
 * @apiVersion 0.0.0
 * @apiGroup School
<<<<<<< HEAD
 * @apiName ListSearchFilters
=======
 * @apiName SchoolTypes
>>>>>>> BP-586 Added get/update methods in school service and controller
 */
exports.listSearchFilters = async (function(req, res) {
    var result;
    try {
        result = await(services.school.searchFilters());
    } catch (e) {
        console.log(e.message);
        result = e.message;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {post} api/school/:id/comment Create new comment
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName CreateComment
 * @apiParam {Text} text Comment text.
 * @apiParam {String = 'Parent', 'Graduate', 'Scholar'} userType UserType.
 * @apiParam {Int[]} score Array[4] of scores.
 * @apiParamExample {json} Request-Example:
 *     {
 *       'text': 'test comment',
 *       'userType': 'Parent',
 *       'score': [3,2,1,5]
 *     }
 */
exports.createComment = async (function(req, res) {
    var result = '';
    try {
        var schoolId = req.params.id,
            params = req.body;
        params.score = params['score[]']; //TODO придумать чтото с этим
        result = JSON.stringify(
            await(services.school.commentTransaction(schoolId, params))
            );
        console.log(result);
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {get} api/school/search Search school
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName Search
 * @apiParam {Object} searchParams Search params.
 * @apiParamExample {json} Request-Example:
 *     {
 *       'searchParams' : {
 *          'name': '123',
 *          'classes': [1,2,3,4],
 *          'schoolType': ['Школа', 'Лицей'],
 *          'gia': [1,2],
 *          'ege': [2,3],
 *          'olimp': [3,5]
 *       }
 *     }
 */
exports.search = async (function(req, res) {
    var result = '';
    try {
        var params = req.query;
        result = await(services.search.searchSchool(params));
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});
