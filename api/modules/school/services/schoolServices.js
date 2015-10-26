var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var commentServices =
    require.main.require('./api/modules/comment/services').commentServices;



exports.getGroupId = async (function(schoolId) {
    var instance = await(models.School.findOne({where : {id: schoolId}}));
    if (instance.comment_group_id == null) {
        var newCommentGroup = await (models.CommentGroup.create());
        await (instance.update({comment_group_id: newCommentGroup.id}))
    }
    return instance.comment_group_id;
});

exports.create = async (function(params) {
    var id = -1;
    return id
});

exports.list = async (function() {
    var schools = await (models.School.findAll(
        {
            order: [
                ['id', 'ASC']
            ]
        }
    ));
    return schools;
});

exports.get = async (function(schoolId) {
    var school =  await (models.School.findOne(
        {
            where: {
                id: schoolId
            },
            include: [{
                all: true,
                nested: true
            }]
        }
    ));
    return school;
});

// exports.getComments = async ( function(comment) {
//
// });
//
exports.comment = async ( function(schoolId, params) {
    var commentGroupId = await (this.getGroupId(schoolId));
    return await (commentServices.create(commentGroupId, params));
});
