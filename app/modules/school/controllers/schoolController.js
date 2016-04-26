const errors = require('../lib/errors');
const soy = require('../../../components/soy');
const services = require('../../../components/services').all;
const schoolView = require('../../../../api/modules/school/views/schoolView');
const searchView = require('../../../../api/modules/school/views/searchView');
const config = require('../../../config').config;
const analyticsId = config.analyticsId;
const logger = require('../../../components/logger/logger').getLogger('app');

const DOMAIN = config.url.protocol + '://' + config.url.host;
const FB_CLIENT_ID = config.facebookClientId;

var async = require('asyncawait/async');
var await = require('asyncawait/await');


exports.createComment = async (function(req, res) {
    var result = '';
    try {
        var schoolId = req.params.id,
            params = req.body;
        result = await(services.school.comment(schoolId,params));
    } catch (e) {
        logger.error(e);
        result = JSON.stringify(e);
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(result);
    }
});


exports.list = async (function(req, res) {
    var searchParams = await(services.search.initSearchParams(req.query));
    var searchText = req.query.name ? decodeURIComponent(req.query.name) : '';

    var promises = {
        schools: services.school.list(
            searchParams,
            {
                limitResults: 10
            }
        ),
        filters: services.school.searchFilters(),
        mapPosition: services.search.getMapPositionParams(searchParams)
    };
    var results = await(promises);

    var schoolsList = schoolView.list(results.schools);
    var map = schoolView.listMap(results.schools, results.mapPosition);
    var filters = searchView.filters(results.filters, searchParams);
    var params = {
        params: {
            data: {
                schools: schoolsList.schools,
                filters: filters
            },
            searchText: searchText,
            countResults: schoolsList.countResults,
            searchSettings: {
                url: '/api/school/search',
                method: 'GET',
                searchParams: searchParams
            },
            map: map,
            config: {
                year: new Date().getFullYear(),
                analyticsId: analyticsId,
                csrf: req.csrfToken(),
                domain: DOMAIN,
                fbClientId: FB_CLIENT_ID
            }
        }
    };
    var html = soy.render('sm.lSearchResult.Template.list', params);

    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
});


exports.view = async (function(req, res, next) {
    try {
        var url = services.urls.stringToURL(req.params.name),
            schoolInstance = await(services.urls.getSchoolByUrl(url));

        if (!schoolInstance) {
            throw new errors.SchoolNotFoundError();
        } else if (url != schoolInstance.url) {
            res.redirect(schoolInstance.url);
        } else {
            var promises = {
                    ege: services.egeResult.getAllBySchoolId(schoolInstance.id),
                    gia: services.giaResult.getAllBySchoolId(schoolInstance.id),
                    olymp: services.olimpResult.getAllBySchoolId(
                        schoolInstance.id
                    ),
                    city: services.cityResult.getAll(),
                    authSocialLink: services.auth.getAuthSocialUrl(),
                    popularSchools: services.school.getPopularSchools()
                },
                dataFromPromises = await(promises);

            var school = await(services.school.viewOne(schoolInstance.id));
            services.school.incrementViews(school.id);
            var user = {
                data: req.user,
                isCommented: typeof await(services.userData.checkCredentials(
                    school.id,
                    req.cookies.clevverId,
                    req.user && req.user.id
                )) !== 'undefined'
            };

            res.header('Content-Type', 'text/html; charset=utf-8');
            res.end(
                soy.render('sm.lSchool.Template.school', {
                params: {
                    data:
                        schoolView.default(
                            school,
                            dataFromPromises,
                            user
                        ),
                    config: {
                        year: new Date().getFullYear(),
                        analyticsId: analyticsId,
                        csrf: req.csrfToken(),
                        domain: DOMAIN,
                        fbClientId: FB_CLIENT_ID
                    }
                }
            }));
        }
    } catch (error) {
        res.status(error.code || 500);
        next();
    }
});

exports.search = async(function(req, res) {
    var dataPromises = {
        popularSchools: services.school.getPopularSchools(3),
        amountSchools: services.school.getSchoolsCount()
    };

    var data = await(dataPromises),
        searchUrl = '/search?name=';

    var html = soy.render('sm.lSearch.Template.base', {
        params: {
              currentCity: 'Москва',
              popularSchools: schoolView.popular(data.popularSchools),
              dataLinks : schoolView.dataLinks(),
              amountSchools: data.amountSchools,
              config: {
                  year: new Date().getFullYear(),
                  analyticsId: analyticsId,
                  csrf: req.csrfToken(),
                  domain: DOMAIN,
                  fbClientId: FB_CLIENT_ID
              }
        }
    });

    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
});
