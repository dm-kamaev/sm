const soy = require.main.require('./app/components/soy'),
    services = require.main.require('./app/components/services').all,
    schoolView = require.main.require('./api/modules/school/views/schoolView'),
    analyticsId = require('../../../config').config.analyticsId;

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
    var params = await(services.search.initSearchParams({
        searchParams: req.query
    }));

    var searchText = req.query.name || '';

    var promises = [
        services.school.list(params),
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
                data: {
                    searchParams: params.searchParams,
                    page: 0
                }
            },
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


exports.view = async (function(req, res) {
    try {
        var url = services.urls.stringToURL(req.params.name),
            schoolInstance = await(services.urls.getSchoolByUrl(url));

        if (!schoolInstance) {
            res.header('Content-Type', 'text/html; charset=utf-8');
            res.status(404);
            res.end('404');
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
                    authSocialLink: services.auth.getSocialLinks(),
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
                        analyticsId: analyticsId
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
                  year: new Date().getFullYear(),
                  analyticsId: analyticsId
              }
          }
    });

    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
});
