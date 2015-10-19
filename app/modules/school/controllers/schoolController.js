var soy = require.main.require('./app/components/soy');

var models = require('../models'),
    School = models.School;


exports.create = function(req, res) {
    //models.user.
};


exports.list = function(req, res) {
    School.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then(schools => {
        var html = '<h1>Список школ</h1>';
        html += schools
            .map(school => '<p><span>' + school.id + '. </span><a href="/school/' + school.id + '">' + school.name + '</a></p>')
            .join('');

        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(html);
    });
};


exports.view = function(req, res) {
    School.findById(req.params.id).then(function(school) {
        var params = {
            data: {
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
                }
            }
        };

        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(
            soy.render('sm.lSchool.Template.base', {
                params: params
            })
        );
    });
};
