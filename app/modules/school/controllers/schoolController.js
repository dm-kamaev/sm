var soy = require.main.require('./app/components/soy');
var services = require.main.require('./app/components/services').all;

var schoolView = require('../../../../api/modules/school/views/schoolView.js');

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

    var schools = await (services.school.list());
    var filters = await (services.school.searchFilters())
        .map(item => {
            var res = {
                data: {
                    filters: item.values,
                    header: {
                        help: ''
                    },
                    name: item.filter
                },
                config: {}
            };

            switch (item.filter) {
                case 'school_type':
                    res.data.header.title = 'Тип школы';
                    res.config.filtersToShow = 15;
                    res.config.cannotBeHidden = true;
                    break;
                case 'ege':
                    res.data.header.title = 'Высокие результаты ЕГЭ';
                    break;
                case 'gia':
                    res.data.header.title = 'Высокие результаты ГИА';
                    break;
                case 'olimp':
                    res.data.header.title = 'Есть победы в олимпиадах';
                    break;
            }

            return res;
        });

    console.log(filters);
    var params = {
        params: {
            data: {
                schools: schools,
                filters: {
                    filters: filters,
                    url: '/api/school/search'
                }
            },
            searchText: req.query.name || '',
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

    console.log(html);
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
});
