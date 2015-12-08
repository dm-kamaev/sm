var colors = require('colors');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var sequelize  = require.main.require('./app/components/db');
var sequelizeInclude = require.main.require('./api/components/sequelizeInclude');
var transaction = require.main.require('./api/components/transaction.js');
var enums = require.main.require('./api/components/enums').all;
var service = {
    name : 'school'
};

service.getGroupId = async (function(school, t) {
    var instance = school;
    if (typeof school === 'number'){
        var instance = await(models.School.findOne({
            where : {id: school},
            transaction: t
        }));
    }
    if (instance.comment_group_id == null) {
        var newCommentGroup = await (models.CommentGroup.create({},{transaction: t}));
        await (instance.update({
            comment_group_id: newCommentGroup.id
        }, {transaction: t}));
    }
    return instance.comment_group_id;
});

/**
 * @public
 */
service.searchFilters = async (function() {
    var olympFilters = services.subject.olympFilters();
    var egeFilters = services.subject.egeFilters();
    var giaFilters = services.subject.giaFilters();
    var typeFilters = service.typeFilters();
    return await (olympFilters, egeFilters, giaFilters, typeFilters);
});

service.typeFilters = async (function() {
    var schoolTypeFilters 
        = await(services.search.getTypeFilters());
    var formattedFilters = schoolTypeFilters.map(filter => {
        return {
            label: filter.name,
            value: filter.id,
        };
    });
    return {
        filter: enums.searchType.SCHOOL_TYPE,
        values: formattedFilters
    };
});

service.getAddresses = async (school => {
    return await(models.Address.findAll({
        where:{school_id: school.id}
    }));
});

service.setAddresses = async ((school, addresses) => {
    var currentAddresses = await(service.getAddresses(school));
    addresses.forEach((adr)=>{
        var sameAdr = currentAddresses.find(element => {
         if (element.name == adr.name)
            return true;
        });
        if (!sameAdr){
            models.Address.create(adr).then(adrinst => {
                school.addAddresses(adrinst);
            });
         }
    });
});

service.update = async ((school, params) => {
    var instance = await(school.update(
        params
    ));
    if (params.addresses)
        await(service.setAddresses(school, params.addresses));
    return instance;
});


service.getForParse = async((govKeyId) => {
    var includeParams = {
        addresses: true
    };
    return await(models.School.findOne({
        where: {
            govermentKey: govKeyId
        },
        include: sequelizeInclude(includeParams)
    }));
});


/**
 * @public
 */
service.viewOne = function(id) {
    var includeParams = //TODO: which one: this
        [{
            model: models.Address,
            as: 'addresses',
            include: [{
                model: models.Department,
                as:'department'
            }]
         }, {
             model: models.Rating,
             as: 'ratings'
         }, {
             model: models.CommentGroup,
             as: 'commentGroup',
             include: [{
                 model: models.Comment,
                 as: 'comments',
                 include: [{
                     model: models.Rating,
                     as: 'rating'
                 }]

             }]
         }];
   // var includeParams = {//TODO: which one: or this
   //     addresses: {
   //         department: true
   //     },
   //     ratings: true,
   //     commentGroup: {
   //         comments: {
   //             rating: true
   //         }
   //     }
   // };
    return await(models.School.findOne({
        where: {id: id},
        include: includeParams
    }));
};


service.create = async (params => {
    var includeParams = {
        addresses: true
    };
    return await(models.School.create(
        params,
        {
            include: sequelizeInclude(includeParams)
        }
    ));
});

/**
 *@public
 */

service.commentTransaction = async (function(schoolId, params) {
    return await (transaction(service.comment, [schoolId, params]));
});
/**
 * @public
 */
service.comment = async (function(schoolId, params, t) {
    var includeParams = {
        commentGroup: true,
        ratings: true
    };
    console.log(sequelizeInclude(includeParams));
    var school = await (models.School.findOne({
        where: {id: schoolId},
        include: sequelizeInclude(includeParams),
        transaction: t
    }));

    console.log(school);
    var commentGroup = await(service.getGroupId(school, t));
    console.log(commentGroup);
    if (params.score)
        params.rating = await(service.rate(school, params, t));
    return await (services.comment.create(commentGroup, params, t));
});



service.rate = async ((school, params, t) => {
    var rt = await (models.Rating.create({
        score: params.score,
        schoolId: school.id
    }, {transaction: t}));
    return rt;
});

/**
 * @public
 */
service.list = async (function() {

    var includeParams = {
        ratings: true
    };

    var schools = await (
        models.School.findAll({
            include: sequelizeInclude(includeParams)
        })
    );

    return schools
        .map(school => service.calculateScore_(school))
        .sort(function(a, b) {
            return b.totalScore - a.totalScore;
        });
});

/**
 * @private
 */
service.calculateScore_ = function(school) {

    school.score = service.avgScore_(school.ratings || []);
    school.totalScore = service.avgRating_(school.score);

    return school;
}

/**
 * @private
 */
service.avgScore_ = function(ratings) {
    var result = [0, 0, 0, 0];
    var ratingLength = ratings.length;

    for (var i = 0, score; i < ratingLength; i++) {
        score = ratings[i].score;
        for (var j = 0; j < result.length; j++) {
            result[j] += score[j];
        }
    }

    if (ratingLength) {
        for (var j = 0; j < result.length; j++) {
            result[j] /= ratingLength;
        }
    }

    return result;
};

/**
 * @private
 */
service.avgRating_ = function(totalScore) {
    var length = totalScore.length,
        result = 0;
    for (var i = 0; i < length; i++) {
        result += totalScore[i];
    }
    return result / length;
};

module.exports = service;
