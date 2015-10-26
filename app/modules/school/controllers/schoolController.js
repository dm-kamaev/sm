var soy = require.main.require('./app/components/soy');

var schoolServices =
    require.main.require('./api/modules/school/services').schoolServices;
var commentServices =
    require.main.require('./api/modules/comment/services').commentServices;

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



}


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
    var CommentGroup = school.CommentGroup ? school.CommentGroup.comments : [];

    var typeConvert = {
        'Parent': 'родитель',
        'Graduate': 'выпускник',
        'Scholar': 'ученик'
    };

    var params = {
        data: {
            id: school.id,
            schoolName: school.name,
            schoolDescr: school.name + " — школа, как школа. Обычная такая",
            directorName: school.director,
            schoolQuote : "Мел",
            classes: "с 1 по 11",
            social:[
            ],
            sites:[
                {name: "Перейти на сайт школы", href: 'http://' + school.site, link: school.site}
            ],
            contacts:{
                address: school.addresses.map(address => { return {title:'', description: address}; }),
                phones: school.phones
            },
            comments: CommentGroup.map(comment => {
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
            })
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
