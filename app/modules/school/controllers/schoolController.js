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
        if (params.score)
            services.school.updateRanks();
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(result);
    }
});


exports.list = async (function(req, res) {
    var promises = [
        services.school.list(),
        services.school.searchFilters()
    ];
    var results = await(promises);

    var schools = schoolView.list(results[0]);
    var filters = schoolView.filters(results[1]);

    var params = {
        params: {
            data: {
                schools: schools,
                filters: {
                    filters: filters,
                    url: '/api/school/search'
                }
            },
            searchText: req.query.name ?
                services.school.convertWinToUnicode(req.query.name) : '',
            templates: {
                search: '{{ name }}',
                item: '{{ name }}',
                text: '{{ name }}',
                value: '{{ id }}'
            }
        }
    };

    var html = soy.render('sm.lSearchResult.Template.base', params);

    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
});

exports.view = async (function(req, res) {
    var school = await (services.school.viewOne(req.params.id));

    if (!school) {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.status(404);
        res.end('404');
        return; // I dont want to be in this method anymore
    }

    console.log(JSON.stringify(schoolView.default(school)));

    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(
        soy.render('sm.lSchool.Template.base', {
        params: {
            data: schoolView.default(school)
        }
    }));
});

exports.search = async(function(req, res) {
    var exampleList = ['Поварская, 14', 'Школа 123', 'Савеловская', 'Лицей'];

    var imagesList = ['images/l-search/advertising_1.png', 'images/l-search/article.png'];

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
              images: imagesList
          }

    });

    //console.log(html);
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
});
