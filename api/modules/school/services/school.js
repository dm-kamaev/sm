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


service.listTypes = async (function(){
    return enums.schoolType
        .toArray()
        .map(type => {
            return {
                label: type,
                value: type
            };
        });

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
                as:'departments'
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
 * usded in console/*. Can be a bit slow
 */
service.listInstances = async(function(){
    return await(models.School.findAll({
        include: [{
                    model: models.Rating,
                    as: 'ratings' 
                }, {
                    model: models.Address,
                    as: 'addresses',
                    include: [{
                        model: models.Department,
                        as: 'departments'
                    }]
                }]          
    }));
});

/**
 * @public
 */
service.list = async (function(opt_params) {
    var params = opt_params || {},
        searchParams = params.searchParams || null,
        includeParams = [
            {
                model: models.Rating,
                as: 'ratings',
                attributes: ['score']
            }
        ];   

    var searchConfig = {
        include: includeParams,
        attributes: [
            'id',
            'name'
        ],
        order: ['id']
    };

    var offset = params.offset || 0;
    var limit = params.limit;

    var order = params.order || 0;

    var orderParam;

    if (parseFloat(order)) {
        orderParam = function(item) {
            return item.score[order - 1]
        }
    } else {
        orderParam = function(item) {
            return item.totalScore
        };
    }

    if (searchParams)
        updateSearchConfig(searchConfig, searchParams);
    console.log(searchConfig);
    var schools = await(models.School.findAll(searchConfig)); 
    console.log('Found: ', colors.green(schools.length));
    console.log('Limit: ', colors.green(limit));
    console.log('Offset: ', colors.green(offset));
    var result = schools
        .map(school => {
            var score = service.avgScore_(school.ratings || []);
            return {
                id: school.id,
                name: school.name,
                description: "",
                totalScore: service.avgRating_(score),
                score: score
            };
        })
        .sort((a, b) =>  b.totalScore - a.totalScore)
        .sort((a, b) =>  orderParam(b) - orderParam(a))
        .filter((item, index) => (
            (index >= offset) &&
            (
                (index < parseFloat(limit) + parseFloat(offset)) ||
                (!limit)
            )
        ));

    console.log('Send: ', colors.green(result.length));

    return result;
});

/**
 * @param {object} searchConfig Existing search config to update
 * @param {object} searchParams
 * @param {?string} searchParams.name
 * @param {?Array<number>} searchParams.classes
 * @param {?number} searchParams.schoolType //TODO: use school_type_filter
 * @param {?Array<number>} searchParams.gia Subjects with high hia results
 * @param {?Array<number>} searchParams.ege
 * @param {?Array<number>} searchParams.olimp
 * TODO: develop criterias
 */
var updateSearchConfig = function(searchConfig, searchParams) {
    var whereParams = {},
        searchDataCount = 0;

    var extraIncludes = {
        searchData : {
            model: models.SearchData,
            as: 'searchData',
            where: {
                $or: []
            }
        }
    }; 

    if (searchParams.name) {
        var nameFilter = services.search.generateFilter(searchParams.name);
        whereParams.$or = [
          { name: nameFilter },
          { fullName: nameFilter},
          { abbreviation: nameFilter}
        ];
    }

    if (searchParams.classes && searchParams.classes.length) {
        whereParams.educationInterval = { 
            $contains: searchParams.classes
        };
    }

    if (searchParams.schoolType && searchParams.schoolType.length) { //TODO: refactor with new filters
        whereParams.schoolType = {
            $or:[]  
        };
        searchParams.schoolType.forEach((item) => { 
            whereParams.schoolType.$or.push(item);
        });
    }
    
    if (searchParams.gia) {
        searchDataCount++;
        extraIncludes.searchData.where.$or.push({ 
            $and: {
                type: searchTypes.GIA,
                values: {
                    $contains: searchParams.gia
                }
            }
        });
    } 

    if (searchParams.ege) {
        searchDataCount++;
        extraIncludes.searchData.where.$or.push({ 
            $and: {
                type: searchTypes.EGE,
                values: {
                    $contains: searchParams.ege
                }
            }
        });
    } 

    if (searchParams.olimp) {
        searchDataCount++;
        extraIncludes.searchData.where.$or.push({ 
            $and: {
                type: searchTypes.OLIMP,
                values: {
                    $contains: searchParams.olimp
                }
            }
        });
    } 

    /*Write generated setting to config object*/   
    searchConfig.where = whereParams;
    if (searchDataCount){
        var extraIncludesArr = [];
        extraIncludesArr.push(extraIncludes.searchData);
        searchConfig.include = searchConfig.include.concat(extraIncludesArr);
        searchConfig.group = '"School"."id"';
        searchConfig.having = ['COUNT(?) = ?', '', searchDataCount];
    }
}

/**
 * @private
 */
service.avgScore_ = function(ratings) {
    ratings = ratings || [];
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
