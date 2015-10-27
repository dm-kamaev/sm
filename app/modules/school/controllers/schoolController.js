var soy = require.main.require('./app/components/soy');

var schoolServices =
    require.main.require('./api/modules/school/services').schoolServices;

var fs = require('fs');
var async = require('asyncawait/async');
var await = require('asyncawait/await');


exports.createComment = async (function(req, res) {
    var result = '';
    try {
        var schoolId = req.params.id,
            params = req.body;
    result = await(schoolServices.comment(schoolId,params));
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

    var schools = await (schoolServices.list());
    var html = '<h1>Список школ</h1>';
    html += schools
        .map(school => '<p><span>' + school.id + '. </span><a href="/school/' + school.id + '">' + school.name + '</a></p>')
        .join('');

    res.header("Content-Type", "text/html; charset=utf-8");
    res.end(html);
});

exports.view = async (function(req, res) {
    var school = await (schoolServices.get(req.params.id));
    var commentGroup = school.CommentGroup ? school.CommentGroup.comments : [];

    var typeConvert = {
        'Parent': 'родитель',
        'Graduate': 'выпускник',
        'Scholar': 'ученик'
    };

    var sumScore = commentGroup
        .map(comment => comment.score)
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

    var params = {
        data: {
            id: school.id,
            schoolName: school.name,
            schoolType: '',
            schoolDescr: school.name + " — школа, как школа. Обычная такая",
            directorName: school.director,
            schoolQuote : "Мел",
            classes: "с 1 по 11",
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
                        description: address
                    };
                }),
                phones: school.phones
            },
            comments: commentGroup.map(comment => {
                console.log('!!!');
                return {
                    author: '',
                    rank: typeConvert[comment.userType],
                    text: comment.text,
                    sections: comment.score.map((score, index) => {
                        var type = [
                            'Педагоги',
                            'Образование',
                            'Доступность',
                            'Атмосфера'
                        ];
                        return {
                            name: type[index],
                            rating: score
                        };
                    })
                };
            }),
            coords: school.coords.map(coords => {
                return {
                    lat: coords[0],
                    lng: coords[1]
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
        })
    );
});
