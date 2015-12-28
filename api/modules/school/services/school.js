'use strict';
var colors = require('colors');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var sequelize  = require.main.require('./app/components/db');
var sequelizeInclude = require.main.require('./api/components/sequelizeInclude');
var enums = require.main.require('./api/components/enums').all;
var service = {
    name : 'school'
};

class SchoolNotFoundError extends Error {
    constructor(id) {
        super('Cant find school with id = ' + id);
    }
}

/**
 * Create school
 * @param {{
 *     name: string,
 *     abbreviation: string,
 *     fullName: string,
 *     schoolType: enum.school.school_type,
 *     director: string,
 *     phones?: strimg[],
 *     site?: string,
 *     educationInterval: number[],
 *     govermentKey: number,
 *     addresses?: {
 *         departments: [{
 *             stage: string,
 *             name: string,
 *             availability: [boolean]
 *         }]
 *     }
 * }} data
 * @return {Object} School model instance
 */
service.create = function(data) {
    var includeParams = {
        addresses: {
            departments: true
        }
    };

    if (data.addresses) {
        data.addresses = data.addresses.filter(address => {
            var result = false;
            var addressBD =
                    await(services.address.getAddress({name: address.name}));
            if (!addressBD) {
                result = true;
            }
            else {
            console.log('Address:'.yellow, address.name);
            console.log('is alredy binded to school '.yellow +
                'with id:'.yellow, addressBD.school_id);
            }

            return result;
        });
        data.addresses.forEach(address => {
            if (!address.coords) {
                var coords = await(
                        services.yapi.getCoords('Москва, ' + address.name)
                    );
                address.coords = coords;
            }
        });
    }
    return await(models.School.create(
        data,
        {
            include: sequelizeInclude(includeParams)
        }
    ));
};


/**
 * Update school data
 * @param {Object} school_id
 * @param {{
 *     name: string,
 *     abbreviation: string,
 *     fullName: string,
 *     schoolType: enum.school.school_type,
 *     director: string,
 *     phones?: strimg[],
 *     site?: string,
 *     educationInterval: number[]
 * }} data
 * @return {Object} School model instance
 */
service.update = async(function(school_id, data) {
    var school = await(
        models.School.findOne({
            where: {id: school_id}
        })
    );
    if (!school)
        throw new SchoolNotFoundError(school_id);
    return await(school.update(data));
});


/**
 * Delete school
 * @param {number} school_id
 */
service.delete = async (function(school_id) {
    var school = await(models.School.findOne(
        {
            where: {id: school_id}
        }
    ));
    if (!school)
        throw new SchoolNotFoundError(school_id);

    await(school.destroy());
    return school_id;
});


/**
 * Get school addresses
 * @param  {school_id} school_id
 * @param  {address_id} address_id
 * @return {[Object]} Address model instance or undefined
 */
service.getAddress = async(function(school_id, address_id) {
    var address = await(services.address.getById(address_id));
    if (address.school_id == school_id) {
        return address;
    }
});


/**
 * Get school addresses
 * @param  {number} schoolId
 * @return {[Object]} Address model instances list
 */
service.getAddresses = async(function(schoolId) {
    console.log(schoolId);
    return await(
        models.Address.findAll({
            where: {schoolId: schoolId},
            include: [
                {
                    model: models.Department,
                    as: 'departments'
                }
            ]
        })
    );
});


/**
 * Get department of school address
 * @param  {school_id} school_id
 * @param  {address_id} address_id
 * @param  {department_id} department_id
 * @return {[Object]} Department model instance or undefined
 */
service.getAddressDepartment = async(
    function(school_id, address_id, department_id) {
        var address = await(service.getAddress(school_id, address_id));
        var department = await(address.getDepartments({where: {id: department_id}}));
        return department;
    }
);


/**
 * Get department of school address
 * @param  {school_id} school_id
 * @param  {address_id} address_id
 * @return {[Object]} Department model instances or undefined
 */
service.getAddressDepartments = async(function(school_id, address_id) {
    var address = await(service.getAddress(school_id, address_id));
    var department = address.getDepartments();
    return department;
});


service.getGroupId = async (function(school) {
    var instance = school;
    if (typeof school === 'number'){
        instance = await(models.School.findOne({
            where : {id: school}
        }));
        if (!instance)
            throw new Error('Can\'t find the school');
    }
    if (instance.commentGroupId === null) {
        var newCommentGroup = await (
            models.CommentGroup.create()
        );
        await (instance.update({
            commentGroupId: newCommentGroup.id
        }));
    }
    return instance.commentGroupId;
});


/**
 * @param {number} schoolId
 * used in Rating model hook
 */
service.onRatingChange = async(function(schoolId) {
    var school = await(models.School.findOne({
        where: {
            id: schoolId
        }
    }));

    if (!school) 
        throw new SchoolNotFoundError(schoolId);
    
    var promises = [
        this.updateScore(school),
        this.updateReviewCount(school),
    ];
    await(promises);
});

/**
 * @param {object} school - School instance
 * @return {Promise}
 */
service.updateReviewCount = async(function(school) {
    var count = await(models.Rating.count({
        where: {
            schoolId: school.id
        }
    }));
    school.update({reviewCount: count});
});

/**
 * @return {Peromise}
 */
service.updateRanks = async(function() {
    //TODO : move to time-driven script in separated thread

    /* Disable logging for this method cause its sloving down the server */
    //console.log(colors.green('Updating ranks'));

    //var rankCounter = 0;
    //var previousScore = -1;

    //var schools = await(models.School.findAll({
    //    attributes: [
    //        'id',
    //        ['total_score', 'totalScore']
    //    ],
    //    order: 'total_score DESC'
    //}));

    //var loggingState = sequelize.options.logging;
    //sequelize.options.logging = false;
   a//wait(schools.forEach(school => {
    //    if (school.totalScore != previousScore)
    //        rankCounter++;
    //    school.update({
    //        rank: rankCounter
    //    });
    //    previousScore = school.totalScore;
    //}));
    //sequelize.options.logging = loggingState;
    //console.log(colors.green('Ranks updated'));
});

/**
 * @param {object} school - School instance
 * @return {Promise}
 */
service.updateScore = async(function(school) {
    var queries = [];
    for (var i = 1; i <= 4; i++) {
        var score = 'score[' + i + ']';
        var queryPromise = sequelize.query(
            'SELECT AVG(' + score + ') AS avg, ' + 
            'count(' + score + ') AS count FROM rating ' +
            'WHERE school_id = ' + school.id + ' AND ' +
             score + '<> 0'
        );
        queries.push(queryPromise);
    }
    var scores = [],
        counts = [];
    await(queries).forEach(
        result => {
            scores.push(result[0][0].avg || 0);
            counts.push(result[0][0].count || 0);
        }
    );
    var totalScore = getTotalScore(scores);
    school.update({
        score: scores,
        totalScore: totalScore,
        scoreCount: counts
    });
});

/**
 *  @param {array<number>} score
 *  @return {number}
 */
var getTotalScore = function(score) {
    score = score || [];
    var count = 0, sum = 0;
    score.forEach(val => {
        val = parseFloat(val);
        if (val) {
            sum += val;
            count++;
        }
    });
    return count ? sum/count : 0;
};


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


/**
 * @param {object} school - school instance
 * @param {number} rank
 */
service.setRankDogm = async(function(school, rank) {
    await(school.update({
        rankDogm: rank
    }));
});

service.setAddresses = async ((school, addresses) => {
    var currentAddresses = await(service.getAddresses(school.id));
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
    var includeParams =
        [{
            model: models.Address,
            as: 'addresses',
            include: [
                {
                    model: models.Department,
                    as:'departments'
                },
                {
                    model: models.Metro,
                    as: 'metroStations'
                }
            ]
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
         },
            //{
            //    model: models.EgeResult,
            //    as: 'egeResults'
            //}, {
            //    model: models.GiaResult,
            //    as: 'giaResults'
            //}, {
            //    model: models.OlimpResult,
            //    as: 'olimpResults'
            //}
        ];

    var school = await(models.School.findOne({
        where: {id: id},
        include: includeParams
    }));
    return school;
};


/**
 * @param {number} schoolId
 * @raram {object} prarams
 * @param {array<number> || null} params.score
 * @param {string || null} params.text
 * @return {object{bool ratingCreated, bool commentCreated}}
 */
service.review = async(function(schoolId, params) {
    if (!params.text && !params.score)
        throw new Error('Expected comment text or rating');
    try {
        console.log(params);
        var answer = {
            ratingCreated: false,
            commentCreated: false
        };
        var school = await(models.School.findOne({
            where: {id: schoolId}
        }));

        if (params.score) {
            params.rating = await(service.rate(school, params));
            answer.ratingCreated = true;
        }
        if (params.text) {
            var commentGroup = await(service.getGroupId(school));
            await (services.comment.create(commentGroup, params));
            answer.commentCreated = true;
        }
        return answer;
    } catch (e) {
        throw e;
    }
});

/**
 * @private
 * @param {object} school
 * @param {array<number>} params.score
 * @return {object}
 */
service.rate = async(function(school, params) {
    var rt = await (models.Rating.create({
        score: params.score,
        schoolId: school.id
    }));
    return rt;
});

service.createActivity = async(params => {
    await (models.Activity.create(
        params,
        {
            //include: models.Activity
        }
    ));
});

service.deleteActivities = async(() => {
    models.Activity.destroy(
        {
            where: {}
        }
    ).then(function() {
        console.log('All activities deleted');
    });
});

/**
 * usded in console. Can be a bit slow
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
 * @param {object || null} opt_params
 * @param {object || null} opt_params.searchParams
 * @param {string || null} opt_params.searchParams.name
 * @param {?Array<number>} opt_params.searchParams.schoolType
 * @param {?Array<number>} opt_params.searchParams.gia
 * @param {?Array<number>} opt_params.searchParams.ege
 * @param {?Array<number>} opt_params.searchParams.olimp
 * @return {promise<array<object>>}
 */
service.list = async (function(opt_params) {
    var params = opt_params || {},
        searchParams = params.searchParams || null;

    var searchConfig = {
        include: [],
        attributes: [
            'id',
            'name',
            'score',
            'name',
            'fullName',
            'abbreviation',
            'totalScore'
        ],
        order: '"totalScore" DESC'
    };

    if (searchParams) {
        updateSearchConfig(searchConfig, searchParams);
    }
    return models.School.findAll(searchConfig).then(schools => {
        console.log('Found: ', colors.green(schools.length)) ;
        return schools;
    });
});

/**
 * @param {string} text
 * @return {promise<array<object>>}
 */
service.searchByText = function(text) {
    var nameFilter = services.search.generateFilter(text),
        whereParams = {
            $or: [
                {
                   name: nameFilter
                }, {
                   fullName: nameFilter
                }, {
                   abbreviation: nameFilter
                }
            ]
        };
    return models.School.findAll({
        where: whereParams
    });
};

/**
 * @param {object} searchConfig Existing search config to update
 * @param {object} searchParams
 * @param {?string} searchParams.name
 * @param {?Array<number>} searchParams.classes
 * @param {?number} searchParams.schoolType
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
                    $overlap: searchParams.school_type
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
                type: enums.searchType.OLIMPIAD,
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
};

module.exports = service;
