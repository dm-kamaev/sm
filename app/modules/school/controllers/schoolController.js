var soy = require.main.require('./app/components/soy');

var models = require.main.require('./app/components/models').all;


var fs = require('fs');
var async = require('asyncawait/async');
var await = require('asyncawait/await');


    /**
     * @api {get} school/:id/comments Gets comments in simple list
     * @apiVersion 0.0.0
     * @apiGroup School
     * @apiName viewComments
     */
exports.viewComments = async (function(req, res) {
    var html = "";
    try {
        var schoolId = req.params.id;
        var instance = await(models.School.findOne({
            where : {
                id: schoolId
            },
            include: [ {
                all: true,
                nested: true
            } ]
        }));

        var comments = instance.CommentGroup.comments;
        for (var i = 0; i < comments.length; i++) {
            html += "<b> id: "+comments[i].id + "</b><br>";
            html += "Text: "+comments[i].text + "<br>";
            html += "UserType: "+comments[i].userType + "<br>";
            html += "Score: "+comments[i].score + "<br>";
            html += "group id: "+comments[i].comment_group_id + "<br><br>";
        }

    } catch (e) {
        console.log(e);
        html = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(html);
    }
});


    /**
     * @api {post} school/:id/createcomment Create new comment
     * @apiVersion 0.0.0
     * @apiGroup School
     * @apiName createComment
     * @apiParam {Text} text Comment text.
     * @apiParam {String = "Parent", "Graduate", "Scholar"} userType UserType.
     * @apiParam {Int[]} score Array[4] of scores.
     */
exports.createComment = async (function(req, res) {
    var result = '';
    try {
        var schoolId = req.params.id,
            params = req.body;
        var instance = await(models.School.findOne({where : {id: schoolId}}));

        if (instance.comment_group_id == null) {
            var newCommentGroup = await (models.CommentGroup.create());
            await (instance.update({comment_group_id: newCommentGroup.id}))
        }

        var commentGroupId = instance.comment_group_id;

        await (models.Comment.create({
            comment_group_id: commentGroupId,
            text: params.text,
            score: params["score[]"],
            userType: params.userType
        }));

        result = 'success';
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(result);
    }
});


/**
 * @api {post} school/createschool Creates cchool
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName create
 */
exports.create = function(req, res) {



}

/**
 * @api {get} school/list Get school list
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName list
 */
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

/**
 * @api {get} school/:id/view Get school view
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName view
 */
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
                },
                comments: school.CommentGroup.comments;
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
