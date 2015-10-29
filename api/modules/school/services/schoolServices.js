var colors = require('colors');
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
        console.log('instance', instance);
    }
    return instance.comment_group_id;
});

var getSchoolParams = parasm => {
    var schoolParams = {
        name: params.name,
        director: params.director,
        phonres: params.phones,
        site: params.site,
        addresses: []
    };
    params.addresses.forEach(adr => {
        schoolParams.addresses.push({
            name: adr,
            coords: []
        })
    });
    return schoolParams;
}

exports.update = async ((school, params) => {
    await(school.update(
        getSchoolParams(params),
        {
            include: [{
                model: models.Address,
                as: 'addresses'
            }]
        }
    ));
});

exports.create = async (params => {
    await(models.School.create(
        getSchoolParams(params),
        {
            include: [{
                model: models.Address,
                as: 'addresses'
            }]
        }
    ));
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
