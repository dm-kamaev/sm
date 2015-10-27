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
    var school = await (schoolServices.getAllById(req.params.id));
    console.log(JSON.stringify(school).yellow);
    var commentGroup = school.CommentGroup ? school.CommentGroup.comments : [];
    console.log(JSON.stringify(commentGroup).blue);
    //console.log(JSON.stringify(commentGroup).blue);
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


    var classFrontier = () => {
        var frontierBegin = '',
            frontierEnd = '';

        if (school.edu_programm_begin !== '') {
            frontierBegin = school.edu_programm_begin == '0' ?
                'детского сада' :
                school.edu_programm_begin;
            frontierBegin = 'C ' + frontierBegin;
        }

        if (school.edu_programm_end !== '') {
            frontierEnd = ' по ' + school.edu_programm_end + ' класс';
        }

        return  frontierBegin + frontierEnd;
    };


    var params = {
        data: {
            id: school.id,
            schoolName: school.name,
            schoolType: '',
            schoolDescr: school.name + " — школа, как школа. Обычная такая",
            directorName: school.director,
            schoolQuote : "Мел",
            classes: classFrontier(),
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
                    sections: comment.score.map((score, index) => {
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
                    })
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

    //console.log(JSON.stringify(t).blue);


    res.header("Content-Type", "text/html; charset=utf-8");
    res.end(
        soy.render('sm.lSchool.Template.base', {
        params: params
    }));
});
