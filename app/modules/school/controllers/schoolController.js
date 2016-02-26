var soy = require.main.require('./app/components/soy');
var services = require.main.require('./app/components/services').all;
const schoolView = require.main.require('./api/modules/school/views/schoolView');

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
    var searchText,
        areaId,
        metroId,
        searchParams = {};

    try{
        searchText = req.query.name ?
            decodeURIComponent(req.query.name) : '';
        areaId = req.query.areaId ?
            decodeURIComponent(req.query.areaId) : '';
        metroId = req.query.metroId ?
            decodeURIComponent(req.query.metroId) : '';
        sortType = req.query.sortType ?
            decodeURIComponent(req.query.sortType) : '';
    } catch(e) {
        searchText = req.query.name || '';
        areaId = req.query.areaId || '';
        metroId = req.query.metroId || '';
        sortType = req.query.sortType || '';
    }

    if (areaId) {
        searchParams.areaId = areaId;
    } else if (metroId) {
        searchParams.metroId = metroId;
    } else if (searchText) {
        searchParams.name = searchText;
    }

    var promises = [
        services.school.list({
            searchParams: searchParams,
            page: 0
        }),
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
            searchText: req.query.name ?
                searchText : '',
            countResults: data.countResults,
            searchSettings: {
                url: '/api/school/search',
                method: 'GET',
                data: {
                    searchParams: searchParams,
                    page: 0
                }
            },
            templates: {
                search: '{{ name }}',
                item: '{{ name }}',
                text: '{{ name }}',
                value: '{{ id }}'
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

            var date = new Date();

            res.header('Content-Type', 'text/html; charset=utf-8');
            res.end(
                soy.render('sm.lSchool.Template.school', {
                params: {
                    data:
                        schoolView.default(school, results, popularSchools),
                    searchTemplates: {
                        search: '{{ name }}',
                        item: '{{ name }}',
                        text: '{{ name }}',
                        value: '{{ id }}'
                    },
                    config: {
                        year: date.getFullYear()
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
    var exampleList = ['Поварская, 14', 'Школа 123', 'Савеловская', 'Лицей'];
    var popularSchools = await (services.school.getPopularSchools(3));
    // var imagesList = ['images/l-search/advertising_1.png', 'images/l-search/article.png'];
    var amountSchools = await (services.school.getSchoolsCount());

    var html = soy.render('sm.lSearch.Template.base', {
          params: {
              currentCity: 'Москва',
              examples: exampleList,
              searchTemplates: {
                  search: '{{ name }}',
                  item: '{{ name }}',
                  text: '{{ name }}',
                  value: '{{ id }}'
              },
              // images: imagesList,
              popularSchools: schoolView.popular(popularSchools),
              dataLinks : [
                  {
                      name: 'Школа 123',
                      url: '/search?name=школа 123'
                  },
                  {
                      name: 'Тургеневская',
                      url: '/search?name=Тургеневская'
                  },
                  {
                      name: 'Лицей',
                      url: '/search?name=Лицей'
                  },
                  {
                      name: 'Замоскворечье',
                      url: '/search?name=Замоскворечье'
                  }
              ],
              amountSchools: amountSchools,
              dataArticle : {
                  urlArticle: 'http://mel.fm/2016/01/09/innovators',
                  urlImg: 'images/l-search/b-link-article/article.png',
                  title: '«Мы не знаем, что лучше для наших детей, это известно только им самим»',
                  subtitle: '10 высказываний новаторов в сфере образования и воспитания'
              }
          }
    });

    //console.log(html);
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
});
