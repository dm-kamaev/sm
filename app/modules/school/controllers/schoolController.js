var soy = require.main.require('./app/components/soy');
var services = require.main.require('./app/components/services').all;
var render = require('../renderers/schoolRenderer');

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
                    filters: render.filters(filters),
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
        

    var typeConvert = {
        'Parent': 'родитель',
        'Graduate': 'выпускник',
        'Scholar': 'ученик'
    };

    var sumScore = school.ratings
        .map(rating => rating.score)
        .reduce((context, coords) => {
            coords.forEach((value, index) => {
                if (value) {
                    context.count[index]++;
                    context.sum[index] += value;
                    context.res[index] = context.sum[index] / context.count[index];
                }
            });

            return context;
        }, {
            sum: [0, 0, 0, 0],
            count: [0, 0, 0, 0],
            res: [0, 0, 0, 0]
        }).res;


    function educationIntervalToString(interval) {
        var res = '';

        if (interval) {
            var begin = interval[0],
                end = interval[interval.length - 1];

            if (end > begin) {
                res += 'Обучение с ';
                res += begin ? begin : 'детского сада';
                res += ' по ' + end + ' класс';
            }
            else {
                res = 'Детский сад';
            }
        }

        return res;
    }

    var ratings = [];
    /*Check that position in Mel's rating exists and less than 100*/
    if (school.rating && school.rating <= 100) {
        ratings.push({
            name: 'Рейтинг пользователей «Мела»',
            place: school.rating,
            href: '/search'
        });
    }
    /*Check that position in Moscow education dept.
      rating exists and less than 100*/
    if (school.rank && school.rank <= 100) {
        ratings.push({
            name: 'Рейтинг Департамента образования Москвы',
            place: school.rank
        });
    }

    var addresses =
            services.department.addressesFilter(school.addresses),
        commentGroup = school.commentGroup ? school.commentGroup.comments : [],
        metroStations = [];
    addresses.forEach(address => {
        metroStations.push(services.address.getMetro(address));
    });
    var params = {
        data: {
            id: school.id,
            schoolName: school.name,
            schoolType: '',
            schoolDescr: '',
            features: '',
            directorName: school.director,
            schoolQuote : 'Мел',
            extendedDayCost: '',
            dressCode: '',
            classes: educationIntervalToString(school.educationInterval),
            social:[],
            metroStations: metroStations,
            sites:[{
                name: 'Перейти на сайт школы',
                href: 'http://' + school.site,
                link: school.site
            }],
            activities: [],
            specializedClasses: [],
            contacts:{
                address: addresses.map(address => {
                    return {
                        title: '',
                        description: address.name,
                        metro: services.address.getMetro(address)
                    };
                }),
                phones: school.phones || ''
            },
            comments: commentGroup
                .filter(comment => comment.text)
                .map(comment => {
                return {
                    author: '',
                    rank: typeConvert[comment.userType],
                    text: comment.text,
                    sections: comment.rating ? comment.rating.score.map((score, index) => {
                        var type = [
                            'Образование',
                            'Преподаватели',
                            'Инфраструктура',
                            'Атмосфера'
                        ];
                        return {
                            name: type[index],
                            rating: score
                        };
                    }) : []
                };
            }),
            coords: addresses.map(adr => {
                return {
                    lat: adr.coords[0],
                    lng: adr.coords[1]
                };
            }),
            ratings: ratings,
            score: sumScore,
            totalScore: sumScore.reduce((context, value) => {
                if (value) {
                    context.sum += value;
                    context.count++;
                    context.res = context.sum / context.count;
                }
                return context;
            }, {
                sum: 0,
                count: 0,
                res: 0
            }).res
        }
    };

    //console.log(params.data);

    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(
        soy.render('sm.lSchool.Template.base', {
        params: params
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
