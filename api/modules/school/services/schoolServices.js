var colors = require('colors');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var commentServices =
    require.main.require('./api/modules/comment/services').commentServices;
var sequelize  = require.main.require('./app/components/db');


exports.getGroupId = async (function(school, t) {
    var instance = school;
    if (typeof school === 'number'){
        var instance = await(models.School.findOne({
            where : {id: school}
        }));
    }
    if (instance.comment_group_id == null) {
        var newCommentGroup = await (models.CommentGroup.create());
        await (instance.update({
            comment_group_id: newCommentGroup.id
        }))
        //console.log('instance', instance);
    }
    return instance.comment_group_id;
});

var getSchoolParams = (params) => {
    var schoolParams = {
        name: params.name,
        director: params.director,
        phonres: params.phones,
        site: params.site,
        goverment_key: params.goverment_key,
        schoolType: params.schoolType,
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



exports.getAddresses = async (school => {
    return await(models.Address.findAll({
        where:{school_id: school.id}
    }));
})

exports.setAddresses = async ((school, addresses) => {
    var currentAddresses = await(this.getAddresses(school));
    addresses.forEach((adr)=>{
        var sameAdr = currentAddresses.find(element => {
         if (element.name == adr.name)
            return true;
        });
        if (!sameAdr){
            models.Address.create(adr).then(adrinst => {
                school.addAddresses(adrinst)
            });
         }
    })
});

exports.update = async ((school, params) => {
    var convertedParams = getSchoolParams(params);
    await(school.update(
        convertedParams
    ));
    if (convertedParams.addresses)
        await(this.setAddresses(school,convertedParams.addresses))
});

exports.rate = async((school, comment, rating) => {

})

exports.getAllById = async((sch_id)=>{
    return await (models.School.findOne({
        where:{id: sch_id},
        include: [{
            all:true,
            nested: true
        }]
    }));
});

exports.getForComment = async((sch_id) =>  {
    return await (models.School.findOne({
        where:{id: sch_id},
        include: [
            {
                model: models.Rating,
                as: 'ratings'
            },
            {
                model: models.CommentGroup,
            }
        ]
    }))
})

//TODO: переделать
exports.get = async((sqlizeOptions, params) => {
    params.include = [{
        model: models.Address,
        as: 'addresses'
    }]
    if (params.count == 'one') {
        return await (models.School.findOne(sqlizeOptions));
    }
    else
        return await (models.School.findAll(sqlizeOptions));
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


exports.comment = async ( function(schoolId, params, t) {
    var school = await (this.getForComment(schoolId, t)),
        commentGroup = await(this.getGroupId(school, t));
    if (params.score)
        params.rating = await(this.rate(school, params, t));
    return await (commentServices.create(commentGroup, params, t));
});



exports.rate = async ((school, params) => {
    var rt = await (models.Rating.create({
        score: params.score,
    }));
    await (school.addRating(rt));
    return rt;
})

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
