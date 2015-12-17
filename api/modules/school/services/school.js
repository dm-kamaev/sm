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
    var typeFilters = service.typeFilters();
    var egeFilters = services.subject.egeFilters();
    var giaFilters = services.subject.giaFilters();
    var olympFilters = services.subject.olympFilters();
    return await (typeFilters, egeFilters, giaFilters, olympFilters);
});

service.typeFilters = async (function() {
    var schoolTypeFilters 
        = await(services.search.getTypeFilters());
    var formattedFilters = schoolTypeFilters.map(filter => {
        return {
            label: filter.name,
            value: filter.id
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

service.findBySite = async(function(site) {
    return await(models.School.findOne({
        where: {
            site: site
        }
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
        inclde: [{
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
        searchParams = params.searchParams || null;

    var searchConfig = {
        include: [
            {
                model: models.Rating,
                as: 'ratings',
                attributes: [
                    'score'
                ]
            },
            {
                model: models.Address,
                as: 'addresses'
            }
        ],
        attributes: [
            'id',
            'name'
        ]
    };

    if (searchParams) {
        updateSearchConfig(searchConfig, searchParams);
    }

    console.log('searchConfig', searchConfig);
    var schools = await(models.School.findAll(searchConfig)); 
    console.log('Found: ', colors.green(schools.length));

    return schools
        .map(school => {
            var score = service.avgScore_(school.ratings || []),
                totalScore = service.avgRating_(score);

            return {
                id: school.id,
                name: school.name,
                description: "",
                totalScore: totalScore,
                score: score,
                addresses: school.addresses
            };
        })
        .sort((school1, school2) => school1.totalScore - school2.totalScore);
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
            },
            attributes: []
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

    if (searchParams.school_type) {
        searchDataCount++;
        extraIncludes.searchData.where.$or.push({
            $and: {
                type: enums.searchType.SCHOOL_TYPE,
                values: {
                    $contains: searchParams.school_type
                }
            }
        });
    }
    
    if (searchParams.gia) {
        searchDataCount++;
        extraIncludes.searchData.where.$or.push({ 
            $and: {
                type: enums.searchType.GIA,
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
                type: enums.searchType.EGE,
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
                type: enums.searchType.OLIMP,
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
        searchConfig.group = '"School"."id", "ratings"."id"';
        searchConfig.having = ['COUNT(?) = ?', '', searchDataCount];
    }
};

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
