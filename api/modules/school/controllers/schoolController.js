'use strict';

const services = require('../../../../app/components/services').all;
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const logger =
    require('../../../../app/components/logger/logger').getLogger('app');

const schoolView = require('../views/schoolView'),
    searchView = require('../views/searchView'),
    specializedClassesView = require('../views/specializedClassesView'),
    activityView = require('../views/activityView');

const searchViewEntity = require('../../entity/views/searchView');

const mapViewType = require('../../entity/enums/mapViewType'),
    entityType = require('../../entity/enums/entityType');


/**
 * @api {post} api/school/createschool Creates school
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName Create
 * @apiParamExample {json} Request-Example:
 *     {
 *         "schoolData" : {
 *             "name": "Общеобразовательная школа",
 *             "abbreviation": "ГОУ СКОШ № 00",
 *             "fullName": "Государственное образовательное учреждение",
 *             "schoolType": "Школа",
 *             "director": "Любимов Олег Вадимович",
 *             "phones": ["(495) 223-32-23", "(499)322-23-33"],
 *             "site": "school.ru",
 *             "educationInterval": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
 *             "govermentKey": 100,
 *             "addresses": [{
 *                 "name":  "ул. Веткина, 2",
 *                 "coords": [55.802275, 37.624876],
 *                 "departments": [{
 *                     "stage": "Начальное образование",
 *                     "name": "Начальное образование",
 *                     "availability": [1, 0, 0]
 *                 }]
 *             }]
 *         }
 *     }
 */
exports.create = async(function(req, res) {
    var result = '';
    try {
        var data = req.body.schoolData;
        result = await(services.school.create(data));
    } catch (error) {
        result = JSON.stringify(error);
        logger.error(result);
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
 *         "schoolData" : {
 *             "name": "Общеобразовательная школа",
 *             "abbreviation": "ГОУ СКОШ № 00",
 *             "fullName": "Государственное образовательное учреждение",
 *             "schoolType": "Школа",
 *             "director": "Любимов Олег Вадимович",
 *             "phones": ["(495) 223-32-23", "(499)322-23-33"],
 *             "site": "school.ru",
 *             "educationInterval": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
 *         }
 *     }
 */
exports.update = async(function(req, res) {
    var result = '';
    try {
        var schoolId = req.params.id;
        var data = req.body.schoolData;
        result = await(services.school.update(schoolId, data));
    } catch (error) {
        logger.error(error.message);
        result = error.message;
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
exports.delete = async(function(req, res) {
    var result = '';
    try {
        var schoolId = req.params.id;
        result = await(services.school.delete(schoolId));
    } catch (error) {
        logger.error(error.message);
        result = error.message;
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
exports.list = async(function(req, res) {
    var result;
    try {
        var schools = await(services.school.list());
        result = schoolView.list(schools);
    } catch (error) {
        logger.error(error.message);
        result = error.message;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {get} api/school/search/suggest Get school list
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName SuggestSearch
 * @apiSuccess {Object[]} schools Very userful documentation here.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "searchString" : "123"
 *     }
 */
exports.suggestSearch = async(function(req, res) {
    var result;
    try {
        var searchString = req.query.searchString;
        var data = await(services.schoolSearch.suggestSearch(searchString)),
            aliases = await(services.page.getAliases(
                data.schools.map(school => school.id),
                entityType.SCHOOL
            ));
        data.schools = schoolView.joinAliases(
            data.schools.map(school => school.dataValues),
            aliases
        );
        result = schoolView.suggest(data);
    } catch (error) {
        logger.error(error.message);
        result = error.message;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {get} api/school/:id Get school
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName School
 * @apiSuccess {Object} schools Very userful documentation here.
 */
exports.view = async(function(req, res) {
    var result;
    try {
        result = await(services.school.viewOne(req.params.id));
    } catch (error) {
        logger.error(error.message);
        result = error.message;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {get} api/school/search/filters Get school type list
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName ListSearchFilters
 */
exports.listSearchFilters = async(function(req, res) {
    var result;
    try {
        result = await(services.school.searchFilters());
    } catch (error) {
        logger.error(error.message);
        result = error.message;
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
 *       "text": "test comment",
 *       "userType": "Parent",
 *       "score": [3,2,1,5]
 *     }
 */
exports.createComment = async(function(req, res) {
    var result = '';
    try {
        var schoolId = req.params.id,
            params = req.body;

        params.userId = req.user && req.user.id;

        var userData = await(services.userData.checkCredentials(
            schoolId,
            params.key,
            params.userId
        ));

        if (typeof userData !== 'undefined') {
            result = [{
                code: 1,
                message: 'Вы уже оставляли отзыв у этой школы.'
            }];
            res.statusCode = 400;

            services.userData.update(userData.id, {
                userId: params.userId
            });
        } else {
            if (params.userId) {
                var user = await(services.user.getUserById(params.userId));
                params.username = user.firstName;
            }

            result = await(services.school.review(schoolId, params));
        }
    } catch (error) {
        result = JSON.stringify(error);
        logger.error(result);
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {get} api/course/search Search controller
 *     Can send results for map on demand and for results list
 * @apiVersion 0.0.1
 * @apiGroup School
 * @apiName Search
 * @apiParam {Object} searchParams
 * @apiParamExample {json} Request-Example:
 *     {
 *         "name": "Sky",
 *         "classes": [1,2,3,4],
 *         "schoolType": [2, 3],
 *         "gia": [2, 1],
 *         "ege": [4, 2],
 *         "olimp": [3, 2],
 *         "specializedClassType": [1],
 *         "activitySphere": [2, 1],
 *         "sortType": 1,
 *         "page": 0,
 *         "metroId: 1,
 *         "areaId: 2,
 *         "districtId: 3,
 *         "categoryId: 4,
 *         "requestMapResults": true
 *     }
 */
exports.search = async(function(req, res) {
    let result;
    try {
        let searchParams = searchView.initSearchParams(req.query),
            schools = await(services.school.list(
                searchParams, {limitResults: 10})
            ),
            aliases = await(services.page.getAliases(
                schoolView.uniqueIds(schools),
                entityType.SCHOOL
            )),
            aliasedSchools = schoolView.joinAliases(schools, aliases);

        result = {
            list: {
                items: schoolView.list(aliasedSchools),
                countResults: schools[0] && schools[0].countResults || 0
            }
        };

        if (req.query.requestMapResults) {
            let mapPosition = await(
                services.map.getPositionParams(searchParams)
            );

            result.map = searchViewEntity.map(aliasedSchools, {
                entityType: entityType.SCHOOL,
                viewType: mapViewType.PIN,
                position: mapPosition
            });
        }
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {get} api/school/search/map Search controller for map
 * Send all results for request with params
 * @apiVersion 0.0.1
 * @apiGroup School
 * @apiName SearchMap
 * @apiParam {Object} searchParams Search params.
 * @apiParamExample {json} Request-Example:
 *     {
 *         "name": "Sky",
 *         "classes": [1,2,3,4],
 *         "schoolType": [2, 3],
 *         "gia": [2, 1],
 *         "ege": [4, 2],
 *         "olimp": [3, 2],
 *         "specializedClassType": [1],
 *         "activitySphere": [2, 1],
 *         "sortType": 1,
 *         "page": 0,
 *         "metroId: 1,
 *         "areaId: 2,
 *         "districtId: 3,
 *         "categoryId: 4,
 *         "requestMapResults": true
 *     }
 */
exports.searchMap = async(function(req, res) {
    let result;
    try {
        let searchParams = searchView.initSearchParams(req.query),
            data = await({
                schools: services.school.list(searchParams),
                mapPosition: services.map.getPositionParams(searchParams),
                aliases: services.page.getAllAliases(entityType.SCHOOL)
            }),
            aliasedMapSchools = schoolView.joinAliases(
                data.schools, data.aliases
            );

        result = {
            map: searchViewEntity.map(aliasedMapSchools, {
                entityType: entityType.SCHOOL,
                viewType: mapViewType.POINT,
                position: data.mapPosition
            })
        };
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {get} api/school/searchLegacy Search in all schools withs given
 * parameters and return 10 results depends of given page
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName Search
 * @apiParam {Object} searchParams Search params.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "name": "123",
 *       "classes": [1,2,3,4],
 *       "schoolType": ["school-or-center", "cadet"],
 *       "gia": ["math", "russian"],
 *       "ege": ["art", "handcraft"],
 *       "olimp": ["computer-science", "sports"],
 *       "metroId": 1,
 *       "areaId": 1,
 *       "districtId": 40,
 *       "sortType": 1,
 *       "page": 0
 *     }
 */
exports.searchLegacy = async(function(req, res) {
    var result;
    try {
        var user = req.user || {},
            params = await(services.schoolSearch.initSearchParams(req.query)),
            favoriteIds =
                await(services.favorite.getByUserId(user.id));

        var schools = await(services.school.list(
                params, {
                    limitResults: 10
                }
            )),
            schoolIds = schoolView.uniqueIds(schools),
            aliases = await(services.page.getAliases(
                schoolIds,
                entityType.SCHOOL
            ));

        var schoolsWithAliases = schoolView.joinAliases(schools, aliases),
            schoolsWithFavoriteMark = schoolView.listWithFavorites(
                schoolsWithAliases, favoriteIds
            );

        result = {
            list: schoolView.listLegacy(
                schoolsWithFavoriteMark, params.sortType, params.page
            ),
            map: schoolView.listMapLegacy(schools)
        };
    } catch (error) {
        result = JSON.stringify(error);
        logger.error(result);
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {get} api/school/searchMapPointsLegacy Search in all schools with given
 * parameters and return all results to place it at map
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName SearchMapPoints
 * @apiParam {Object} searchParams Search params.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "name": "123",
 *       "classes": [1,2,3,4],
 *       "schoolType": ["school-or-center", "cadet"],
 *       "gia": ["math", "russian"],
 *       "ege": ["art", "handcraft"],
 *       "olimp": ["computer-science", "sports"],
 *       "metroId": 1,
 *       "areaId": 1,
 *       "sortType": 1
 *     }
 */
exports.searchMapPointsLegacy = async(function(req, res) {
    var result;
    try {
        var params = await(services.schoolSearch.initSearchParams(
            req.query
        ));

        var promises = {
            schools: services.school.list(params),
            mapPosition: services.schoolSearch.getMapPositionParams(
                params
            ),
            aliases: services.page.getAllAliases(entityType.SCHOOL)
        };
        var results = await(promises);
        result = schoolView.listMapLegacy(
            schoolView.joinAliases(results.schools, results.aliases),
            results.mapPosition
        );
    } catch (error) {
        result = JSON.stringify(error);
        logger.error(result);
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * Search over activity spheres by given name or school id
 * @api {get} api/school/activitySphere
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName ActivitySphere
 * @apiParam {Object} searchParams Search params.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "schoolId": 123,
 *       "name": "матем"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *                "label": "Математика",
 *                "value":"1"
 *             },
 *             {
 *                "label": "Занимательная математика",
 *                "value":"2"
 *             }
 *     ]
 *
 * @apiError Error (Error 500)
 */
exports.activitySphere = async(function(req, res) {
    var name,
        result;
    try {
        name = req.query.name || '';

        var activitySpheres =
                await(services.additionalEducation.searchSphereByName(name));

        result = activityView.sphereFilter(activitySpheres);
        res.status(200);
    } catch (error) {
        res.status(500);
        result = error.message;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * Search over activity spheres by given name or school id
 * @api {get} api/school/activitySphere/popular
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName PopularActivitySphere
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *            "label": "Математика",
 *            "value":"1"
 *         },
 *         {
 *            "label": "Занимательная математика",
 *            "value":"2"
 *         }
 *     ]
 *
 * @apiError Error (Error 500)
 */
exports.popularActivitySphere = async(function(req, res) {
    var result;
    try {
        var popularActivitySpheres =
            await(services.additionalEducation.getPopularSpheres());

        result = activityView.sphereFilter(popularActivitySpheres);
        res.status(200);
    } catch (error) {
        res.status(500);
        result = error.message;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * Search over specialized class types sphere by given name or by school id
 * @api {get} api/school/specializedClassType
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName SpecializedClassType
 * @apiParam {Object} searchParams Search params.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "schoolId": 123,
 *       "name": "матем"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *                "label": "Математика",
 *                "value":"1"
 *             },
 *             {
 *                "label": "Занимательная математика",
 *                "value":"2"
 *             }
 *     ]
 *
 * @apiError Error (Error 500)
 */
exports.specializedClassType = async(function(req, res) {
    var name,
        result;
    try {
        name = req.query.name || '';

        var specializedClassTypes =
                await(services.specializedClasses.searchTypeByName(name));

        result = specializedClassesView.typeFilters(specializedClassTypes);
    } catch (error) {
        res.status(500);
        result = error.message;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * Search over specialized class types sphere by given name or by school id
 * @api {get} api/school/specializedClassType/popular
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName PopularSpecializedClassType
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *                "label": "Математика",
 *                "value":"1"
 *             },
 *             {
 *                "label": "Занимательная математика",
 *                "value":"2"
 *             }
 *     ]
 *
 * @apiError Error (Error 500)
 */
exports.popularSpecializedClassType = async(function(req, res) {
    var result;
    try {
        var popularSpecializedClassTypes =
            await(services.specializedClasses.getPopularTypes());

        result =
            specializedClassesView.typeFilters(popularSpecializedClassTypes);
        res.status(200);
    } catch (error) {
        res.status(500);
        result = error.message;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});
