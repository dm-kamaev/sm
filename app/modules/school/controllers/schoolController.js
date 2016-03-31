var soy = require.main.require('./app/components/soy');
var services = require.main.require('./app/components/services').all;
const schoolView = require.main.require('./api/modules/school/views/schoolView');
var urlConfig = require('../../../config').config.url;

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
    console.log(searchParams);
    var searchText = req.query.name || '';

    var promises = [
        services.school.list(searchParams),
        services.school.searchFilters()
    ];
    var results = await(promises);

    var data = schoolView.list(results[0]);

    var filters = schoolView.filters(results[1]);

    var params = {
        params: {
            data: {
                schools: data.schools,
                filters: {
                    filters: filters,
                    url: '/api/school/search'
                }
            },
            searchText: searchText,
            countResults: data.countResults,
            searchSettings: {
                url: '/api/school/search',
                method: 'GET',
                searchParams: searchParams
            },
            config: {
                year: new Date().getFullYear()
            }
        }
    };

    var html = soy.render('sm.lSearchResult.Template.list', params);

    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
});


exports.view = async (function(req, res) {
    try {
        var url = services.urls.stringToURL(req.params.name);
        var schoolInstance = await(services.urls.getSchoolByUrl(url));
        if (!schoolInstance) {
            res.header('Content-Type', 'text/html; charset=utf-8');
            res.status(404);
            res.end('404');
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
                        authUrl: AUTH_URL
                    }
                }
            }));
        }
    } catch (e) {
        console.log(e);
        res.status(500);
        res.end('500 Internal Server Error');
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
              dataLinks : [
                  {
                      name: 'Школа 123',
                      url: searchUrl +
                        encodeURIComponent('школа 123')
                  },
                  {
                      name: 'Тургеневская',
                      url: searchUrl +
                        encodeURIComponent('Тургеневская')
                  },
                  {
                      name: 'Лицей',
                      url: searchUrl +
                        encodeURIComponent('Лицей')
                  },
                  {
                      name: 'Замоскворечье',
                      url: searchUrl +
                        encodeURIComponent('Замоскворечье')
                  }
              ],
              amountSchools: data.amountSchools,
              dataArticle : {
                  urlArticle: 'http://mel.fm/2015/12/08/change_school/',
                  urlImg: 'images/l-search/b-link-article/article.png',
                  title: '7\u00A0причин, чтобы сменить\u00A0школу',
                  subtitle: 'Как понять, что вы\u00A0просчитались' +
                            ' с\u00A0выбором учебного\u00A0заведения'
              },
              config: {
                  year: new Date().getFullYear()
              }
          }
    });

    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
});
