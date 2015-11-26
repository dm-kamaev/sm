var soy = require.main.require('./app/components/soy');
var services = require.main.require('./app/components/services').all;

var fs = require('fs');
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
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(result);
    }
});


exports.create = function(req, res) {

};


exports.list = async (function(req, res) {

    var schools = await (services.school.list());

    var schoolList =
        schools.map(school => {
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
            var totalScore = sumScore.reduce((context, value) => {
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
            }).res;
            return {
                id: school.id,
                name: school.name,
                score: sumScore,
                totalScore: totalScore,
                description: ""
            }
        });

    var html = soy.render('sm.lSearchResult.Template.base', {
        params: {
            data: {
                schools: schoolList
            }
        }
    });
    res.header("Content-Type", "text/html; charset=utf-8");
    res.end(html);
});

exports.view = async (function(req, res) {
    var school = await (services.school.getAllById(req.params.id));
    console.log(JSON.stringify(school).yellow);

    var commentGroup = school.CommentGroup ? school.CommentGroup.comments : [];
    console.log(JSON.stringify(commentGroup).blue);

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
        var begin = interval[0],
            end = interval[1],
            res = '';

        if (begin > -1) {
            res += begin ? begin : 'Детский сад';
            if (end > begin) {
                res += '–';
                res += end;
                res += begin ? ' классы' : ' класс';
            }
        }

        return res;
    }


    var params = {
        data: {
            id: school.id,
            schoolName: school.name,
            schoolType: '',
            schoolDescr: '',
            directorName: school.director,
            schoolQuote : "Мел",
            classes: educationIntervalToString(school.educationInterval),
            social:[],
            sites:[{
                name: "Перейти на сайт школы",
                href: 'http://' + school.site,
                link: school.site
            }],
            contacts:{
                address: school.addresses.map(address => {
                    return {
                        title: '',
                        description: address.name
                    };
                }),
                phones: school.phones || ''
            },
            comments: commentGroup.map(comment => {
                return {
                    author: '',
                    rank: typeConvert[comment.userType],
                    text: comment.text,
                    sections: comment.rating ? comment.rating.score.map((score, index) => {
                        var type = [
                            'Образование',
                            'Преподаватели',
                            'Доступность',
                            'Атмосфера'
                        ];
                        return {
                            name: type[index],
                            rating: score
                        };
                    }) : []
                };
            }),
            coords: school.addresses.map(adr => {
                return {
                    lat: adr.coords[0],
                    lng: adr.coords[1]
                };
            }),
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

    console.log(params.data);

    res.header("Content-Type", "text/html; charset=utf-8");
    res.end(
        soy.render('sm.lSchool.Template.base', {
        params: params
    }));
});

exports.search = async(function(req, res) {
    var exampleList = ['Поварская, 14', 'Школа 123', 'Савеловская', 'Лицей'];
    var html = soy.render('sm.lSearch.Template.base', {
      params: {
          currentCity: 'Москва',
          examples: exampleList
      }
    });
    res.header("Content-Type", "text/html; charset=utf-8");
    res.end(html);
});
