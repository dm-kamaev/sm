var soy = require.main.require('./app/components/soy');
var services = require.main.require('./app/components/services').all;
const schoolView = require('../../../../api/modules/school/views/schoolView');
const searchView = require('../../../../api/modules/school/views/searchView');
var urlConfig = require('../../../config').config.url;
var analyticsId = require('../../../config').config.analyticsId;
var errors = require('../lib/errors');

const AUTH_URL = urlConfig.protocol + '://' + urlConfig.host + ':3001/oauth';

var async = require('asyncawait/async');
var await = require('asyncawait/await');


exports.createComment = async (function(req, res) {
    var result = '';
    try {
        var schoolId = req.params.id,
            params = req.body;
        result = await(services.school.comment(schoolId,params));
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(result);
    }
});


exports.list = async (function(req, res) {
    var searchParams = await(services.search.initSearchParams(req.query));
    var searchText = req.query.name ? decodeURIComponent(req.query.name) : '';
    var promises = [
        services.school.list(searchParams),
        services.school.searchFilters()
    ];
    var results = await(promises);

    var data = schoolView.list(results[0]);
    var filters = searchView.filters(results[1], searchParams);
    
    var params = {
        params: {
            data: {
                schools: data.schools,
                filters: filters
            },
            searchText: searchText,
            countResults: data.countResults,
            searchSettings: {
                url: '/api/school/search',
                method: 'GET',
                searchParams: searchParams
            },
            mapSchools: data.mapSchools,
            config: {
                year: new Date().getFullYear(),
                analyticsId: analyticsId
            }
        }
    };

    var html = soy.render('sm.lSearchResult.Template.list', params);

    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
});


exports.view = async (function(req, res, next) {
    try {
        var url = services.urls.stringToURL(req.params.name);
        var schoolInstance = await(services.urls.getSchoolByUrl(url));

        if (!schoolInstance) {
            throw new errors.SchoolNotFoundError();
        } else if (url != schoolInstance.url) {
            res.redirect(schoolInstance.url);
        } else {
            var resPromises = {
                    ege: services.egeResult.getAllBySchoolId(schoolInstance.id),
                    gia: services.giaResult.getAllBySchoolId(schoolInstance.id),
                    olymp: services.olimpResult.getAllBySchoolId(
                        schoolInstance.id
                    ),
                    city: services.cityResult.getAll()
                },
                results = await(resPromises);

            var school = await(services.school.viewOne(schoolInstance.id));
            services.school.incrementViews(school.id);
            var popularSchools = await(services.school.getPopularSchools());
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
                            results,
                            user,
                            popularSchools
                        ),
                    config: {
                        year: new Date().getFullYear(),
                        authUrl: AUTH_URL,
                        analyticsId: analyticsId
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
              dataArticle : {
                  urlArticle: 'http://mel.fm/2015/12/08/change_school/',
                  urlImg: 'images/l-search/b-link-article/article.png',
                  title: '7\u00A0причин, чтобы сменить\u00A0школу',
                  subtitle: 'Как понять, что вы\u00A0просчитались' +
                            ' с\u00A0выбором учебного\u00A0заведения'
              },
              config: {
                  year: new Date().getFullYear(),
                  analyticsId: analyticsId
              }
          }
    });

    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
});
