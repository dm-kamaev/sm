'use strict';

const colors = require('colors'),
    async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    lodash = require('lodash');

const models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all,
    entityType = require('../../entity/enums/entityType');
const School = models.School;

const SchoolNotFoundError =
    require('../controllers/errors/SchoolNotFoundError.js');

const sequelize = require('../../../../app/components/db'),
    redis = require('../../../../app/components/redis'),
    CsvConverter =
        require('../../../../console/modules/modelArchiver/CsvConverter'),
    RatingChanger = require('../../comment/lib/RatingChanger');

const logger = require('../../../../app/components/logger/logger')
    .getLogger('app');

let service = {
    name: 'school'
};


/**
 * Create school
 * @param {{
 *     name: string,
 *     abbreviation: string,
 *     fullName: string,
 *     schoolType: enum.school.school_type,
 *     director: string,
 *     phones: (string[]|undefined),
 *     site: (string|undefined),
 *     educationInterval: number[],
 *     govermentKey: number,
 *     addresses: ({
 *         departments: Array<{
 *             stage: string,
 *             name: string,
 *             availability: boolean
 *         }>
 *     }|undefined)
 * }} data
 * @return {Object} School model instance
 */
service.create = function(data) {
    CsvConverter.cureQuotes(data);
    var includeParams = [{
        model: models.Address,
        as: 'addresses',
        include: [{
            model: models.Department,
            as: 'departments'
        }]
    }];

    if (data.addresses) {
        data.addresses = data.addresses.filter(address => {
            var result = false;
            var addressBD =
                    await(services.address.getAddress({name: address.name}));
            if (!addressBD) {
                result = true;
            } else {
                console.log('Address:'.yellow, address.name);

                var oldSchool = services.school.viewOne(addressBD.school_id);

                console.log('Schools:'.yellow);
                console.log(oldSchool.fullName);
                console.log('govermentKey: ' + oldSchool.govermentKey);
                console.log(data.fullName);
                console.log('govermentKey: ' + data.govermentKey);
                console.log();
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
            include: includeParams
        }
    ));
};


/**
 * Update school data
 * @param {Object} schoolId
 * @param {Object}
 * {
 *   "description": "Многопрофильная школа с развитой системой профориентации и «университетскими субботами»",
 *   "features": ["В лицее нет традиционных классов: ученики делятся на группы в зависимости от выбранного ими учебного плана", " В расписании предусмотрены факультетские дни, которые лицеисты проводят на профильных факультетах НИУ ВШЭ"]
 * }
 */
service.update = async(function(schoolId, data) {
    CsvConverter.cureQuotes(data);
    await(School.update(data, {
        where: {
            id: schoolId
        }
    }));
});


/**
 * checkExist check exist school
 * @param  {[int]} schoolId
 * @return {Object} School model instance
 */
service.checkExist = async(function(schoolId) {
    let school = await(School.findOne({
        where: {
            id: schoolId
        }
    }));

    if (!school) { throw new SchoolNotFoundError(schoolId); }
    return school;
});


/**
 * Delete school
 * @param {number} schoolId
 */
service.delete = async(function(schoolId) {
    var school = await(models.School.findOne(
        {
            where: {id: schoolId}
        }
    ));
    if (!school) {
        throw new SchoolNotFoundError(schoolId);
    }
    await(school.destroy());
    return schoolId;
});


/**
 * Get school addresses
 * @param  {school_id} schoolId
 * @param  {address_id} addressId
 * @return {[Object]} Address model instance or undefined
 */
service.getAddress = async(function(schoolId, addressId) {
    var address = await(services.address.getById(addressId));
    if (address.school_id == schoolId) {
        return address;
    }
});

/**
 * @param {number} schoolId
 */
service.incrementViews = async(function(schoolId) {
    var sqlString = 'UPDATE school SET views = views + 1 where id = ' +
        schoolId;
    await(sequelize.query(sqlString));
});

/**
 * @param {number} opt_amount
 * @return {array<object>} school instances
 */
service.getPopularSchools = async(function(opt_amount) {
    var popularSchools = redis.get('school.popularSchools');

    if (!popularSchools) {
        var pages = await(services.page.getPopular(
            entityType.SCHOOL, opt_amount
        ));

        popularSchools = await(models.School.findAll({
            where: {
                id: {
                    $in: pages.map(page => page.entityId)
                }
            },
            include: [{
                model: models.Address,
                as: 'addresses',
                required: false,
                where: {
                    isSchool: true,
                    entityType: entityType.SCHOOL
                },
                include: [
                    {
                        model: models.AddressMetro,
                        as: 'addressMetroes',
                        include: [
                            {
                                model: models.Metro,
                                as: 'metro'
                            }
                        ]
                    }
                ]
            }],
            order: [
                [
                    {
                        model: models.Address,
                        as: 'addresses'
                    },
                    {
                        model: models.AddressMetro,
                        as: 'addressMetroes'
                    },
                    'distance',
                    'ASC'
                ]
            ]
        }));

        redis.set('school.popularSchools', popularSchools, 60 * 60);
    }

    return popularSchools;
});


/**
 * @param {number} amount
 * @return {array<object>} school instances
 */
service.getRandomPopularSchools = async(function(amount) {
    var schools = await(service.getPopularSchools()),
        schoolsLen = schools.length,
        resultLen = Math.min(schoolsLen, amount),
        randomIndexes = service.getRandomIndexes(0, schoolsLen - 1, resultLen);

    return randomIndexes.map(index => schools[index]);
});


/**
 * Get array of random numbers
 * @param {number} start
 * @param {number} end
 * @param {number} amount
 * @return {Array}
 */
service.getRandomIndexes = function(start, end, amount) {
    var res = [],
        randomIndex;

    while (res.length < amount) {
        randomIndex = lodash.random(start, end);

        while (res.indexOf(randomIndex) != -1) {
            randomIndex = lodash.random(start, end);
        }

        res.push(randomIndex);
    }

    return res;
};


/**
 * Get school addresses
 * @param  {number} schoolId
 * @return {[Object]} Address model instances list
 */
service.getAddresses = async(function(schoolId) {
    return await(
        models.Address.findAll({
            where: {
                entityId: schoolId,
                entityType: entityType.SCHOOL
            },
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
 * Get amount schools
 * @return {number} schoolsCount
 */
service.getSchoolsCount = async(function() {
    var schoolsCount = await(models.School.count());
    return schoolsCount;
});


/**
 * Get department of school address
 * @param  {school_id} schoolId
 * @param  {address_id} addressId
 * @param  {department_id} departmentId
 * @return {[Object]} Department model instance or undefined
 */
service.getAddressDepartment = async(
    function(schoolId, addressId, departmentId) {
        var address = await(service.getAddress(schoolId, addressId));
        var department = await(address.getDepartments({
            where: {id: departmentId}
        }));
        return department;
    }
);


/**
 * Get department of school address
 * @param  {school_id} schoolId
 * @param  {address_id} addressId
 * @return {[Object]} Department model instances or undefined
 */
service.getAddressDepartments = async(function(schoolId, addressId) {
    var address = await(service.getAddress(schoolId, addressId));
    var department = address.getDepartments();
    return department;
});

/**
 * Get school by comment group id
 * @param {number} groupId
 * @return {Object} School instance or undefined
 */
service.getSchoolByGrouId = async(function(groupId) {
    var school = await(models.School.findOne({
        where: {
            commentGroupId: groupId
        }
    }));
    return school;
});

/**
 * @param {Object|string|number} school
 * @type {number}
 */
service.getGroupId = async(function(school) {
    var instance = school;
    if (typeof school === 'number' || typeof school === 'string') {
        instance = await(models.School.findOne({
            where: {id: school}
        }));
        if (!instance) {
            throw new Error('Can\'t find the school');
        }
    }
    if (instance.commentGroupId === null) {
        var newCommentGroup = await(
            models.CommentGroup.create()
        );
        await(instance.update({
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

    if (!school) {
        throw new SchoolNotFoundError(schoolId);
    }
    try {
        await(this.updateReviewCount(school));
        await(this.updateScore(school));
    } catch (error) {
        logger.error(error);
    }
});


/**
 * Return schools with geo data included, finded by id,
 * in order  by given array of ids
 * @param {number} schoolId
 * @return {Promise<Array<models.School>>}
 */
service.getByIdsWithGeoData = async(function(schoolIds) {
    var schools = await(models.School.findAll({
        where: {
            id: {
                $in: schoolIds
            }
        },
        attributes: ['id', 'name', 'totalScore'],
        include: [{
            model: models.Address,
            required: false,
            where: {
                isSchool: true,
                entityType: entityType.SCHOOL
            },
            as: 'addresses',
            attributes: ['id', 'name'],
            include: [
                {
                    model: models.AddressMetro,
                    as: 'addressMetroes',
                    attributes: ['id', 'distance'],
                    include: [{
                        model: models.Metro,
                        as: 'metro'
                    }],
                },
                {
                    model: models.Area,
                    as: 'area',
                    attributes: ['id', 'name']
                }
            ]
        }],
        order: [
            ['id', 'ASC'],
            [
                {
                    model: models.Address,
                    as: 'addresses'
                },
                'id',
                'ASC'
            ],
            [
                {
                    model: models.Address,
                    as: 'addresses'
                },
                {
                    model: models.AddressMetro,
                    as: 'addressMetroes'
                },
                'distance',
                'ASC'
            ]
        ]
    }));

    return schoolIds.map(schoolId => {
        return schools.find(school => {
            return school.id == schoolId;
        });
    });
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
 * @return {Promise}
 * used in cron script
 */
service.updateRanks = async(function() {
    /* Disable logging for this method cause its sloving down the server */
    console.log(colors.green('Updating ranks'));

    var rankCounter = 0;
    var previousScore = -1;

    var schools = await(models.School.findAll({
        attributes: [
            'id',
            ['total_score', 'totalScore']
        ],
        order: 'total_score DESC'
    }));

    var loggingState = sequelize.options.logging;
    sequelize.options.logging = false;
    await(schools.forEach(school => {
        if (school.totalScore != previousScore) {
            rankCounter++;
        }
        school.update({
            rank: rankCounter
        });
        previousScore = school.totalScore;
    }));
    sequelize.options.logging = loggingState;
    console.log(colors.green('Ranks updated'));
});

/**
 * @param {object} school - School instance
 * @return {Promise}
 */
service.updateScore = async(function(school) {
    var queries = [];
    for (var i = 1; i <= 4; i++) {
        var score = 'score[' + i + ']';
        /**
         * TODO: add query type
         */
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
            var count = result[0][0].count || 0;
            counts.push(count);
            if (count >= 3) {
                scores.push(result[0][0].avg || 0);
            } else {
                scores.push(0);
            }
        }
    );
    if (!isFeedbackLack(counts, school.reviewCount)) {
        school.update({
            score: scores,
            totalScore: getTotalScore(scores),
            scoreCount: counts
        });
    } else {
        school.update({
            scoreCount: counts,
            score: scores
        });
    }
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
    return count ? sum / count : 0;
};

/**
 * Checks amount of ratings
 * @param {array} scoreCount
 * @param {number} reviewCount
 * @return {bool}
 */
var isFeedbackLack = function(scoreCount, reviewCount) {
    var ratingsLack = !(reviewCount >= 5),
        i = scoreCount && scoreCount.length || 0;

    while (i-- && !ratingsLack) {
        if (scoreCount[i] < 3) {
            ratingsLack = true;
        }
    }

    return ratingsLack;
};

/**
 * Get all data for generate search filters
 * @param {{
 *     activitySphere: Array<number>,
 *     specializedClassType: Array<number>
 * }} searchParams
 * @return {{
 *      subjects: Array<models.Subject>,
 *      schoolTypes: Array<models.SchoolTypeFilter>,
 *      egeSubjects: Array<models.EgeResult>,
 *      giaSubjects: Array<models.GiaResult>,
 *      olympiadSubjects: Array<models.OlimpResult>,
 *      activitySpheres: Array<models.AdditionalEducationSphere>,
 *      specializedClassesTypes: Array<models.SpecializedClassType>
 * }}
 * @public
 */
service.searchFiltersData = async(function(searchParams) {
    var data = {
        subjects: services.subject.getAll(),
        schoolTypes: services.schoolSearch.getTypeFilters(),
        egeSubjects: services.egeResult.getUniqueSubjects(),
        giaSubjects: services.giaResult.getUniqueSubjects(),
        olympiadSubjects: services.olimpResult.getUniqueSubjects(),
        activitySpheres: services.additionalEducation.getSpheresBySearchParams(
            searchParams.activitySphere
        ),
        specializedClassesTypes:
            services.specializedClasses.getTypesBySearchParams(
                searchParams.specializedClassType
            )
    };
    return await(data);
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

service.setAddresses = async((school, addresses) => {
    var currentAddresses = await(service.getAddresses(school.id));
    addresses.forEach(adr => {
        var sameAdr = currentAddresses.find(element => {
            if (element.name == adr.name) {
                return true;
            }
        });
        if (!sameAdr) {
            models.Address.create(adr).then(adrinst => {
                school.addAddresses(adrinst);
            });
        }
    });
});


service.getForParse = async(govKeyId => {
    var includeParams = [{
        model: models.Address,
        as: 'addresses'
    }];
    return await(models.School.findOne({
        where: {
            govermentKey: govKeyId
        },
        include: includeParams
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
 * @param {number} id
 * @return {Object}
 */
service.viewOne = function(id) {
    var school = await(models.School.findOne({
        where: {id: id}
    }));

    var resultPromises = {
        activities: services.additionalEducation.findBySchoolId(id),
        comments: services.comment.getComments(school.commentGroupId),
        addresses: services.address.getWithDepartmentsWithMetro(
            id,
            entityType.SCHOOL, {
                isSchool: true,
                order: true
            }
        )
    };

    var result = await(resultPromises);

    school.comments = result.comments;
    school.activities = result.activities;
    school.addresses = result.addresses;

    return school;
};


/**
 * @param {number} schoolId
 * @param {object} params
 * @param {array<number>|null} params.score
 * @param {string|null} params.text
 * @param {string|null} params.userType
 * @param {number|null} params.yearGraduate
 * @param {string|null} params.classType
 * @param {string|null} params.key
 * @param {string|null} params.username
 * @param {number|null} params.userId
 * @return {object{bool ratingCreated, bool commentCreated}}
 */
service.review = async(function(schoolId, params) {
    if (!params.text && !params.score) {
        throw new Error('Expected comment text or rating');
    }
    var school = await(models.School.findOne({
        where: {id: schoolId}
    }));

    var userData = {
        userType: params.userType,
        yearGraduate: params.yearGraduate,
        classType: params.classType,
        key: params.key,
        username: params.username,
        userId: params.userId
    };

    var userDataInstance = await(services.userData.create(userData));

    params.userDataId = userDataInstance.id;

    if (params.score) {
        params.rating = await(services.rating.create(params.score));
    }

    var commentGroup = await(service.getGroupId(school));
    await(services.comment.create(commentGroup, params));

    await(service.updateRating(commentGroup));
});

/**
 * @param {number} commentGroupId
 */
service.updateRating = async(function(commentGroupId) {
    let ratingChanger = new RatingChanger(
        models.School.tableName,
        commentGroupId
    );

    await(ratingChanger.update());
});

service.createActivity = async(params => {
    CsvConverter.cureQuotes(params);
    await(models.Activity.create(
        params,
        {
            // include: models.Activity
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
service.listInstances = async(function() {
    return await(models.School.findAll({
        include: [{
            model: models.Address,
            as: 'addresses',
            required: false,
            where: {
                entityType: entityType.SCHOOL
            },
            include: [{
                model: models.Department,
                as: 'departments'
            }]
        }]
    }));
});

/**
 * @public
 * @param {Object=} opt_params
 * @param {?number} opt_params.page
 * @param {?Object} opt_params.searchParams
 * @param {?string} opt_params.searchParams.name
 * @param {?Array.<number>} opt_params.searchParams.schoolType
 * @param {?Array.<number>} opt_params.searchParams.gia
 * @param {?Array.<number>} opt_params.searchParams.ege
 * @param {?Array.<number>} opt_params.searchParams.olimp
 * @param {?string} opt_params.searchParams.name
 * @param {?number} opt_params.searchParams.metroId
 * @param {?number} opt_params.searchParams.areaId
 *
 * @param {Object=} opt_config
 * @param {number} opt_config.limitResults
 *
 * @return {Promise<Array.<Object>>}
 */
service.list = async(function(opt_params, opt_config) {
    var searchParams = opt_params || {},
        config = opt_config || {},
        limitResults = config.limitResults || null;

    var sqlString = services.schoolSearch.getSearchSql(
        searchParams,
        limitResults
    );

    var options = {
        replacements: { name: '%' + searchParams.name + '%' },
        type: sequelize.QueryTypes.SELECT
    };

    return sequelize.query(sqlString, options);
});

/**
 * @param {Array<number>} ids
 * @return {promise<array<object>>}
 */
service.searchByIds = function(ids) {
    return ids.length ?
        models.School.findAll({
            attributes: [
                'id',
                'name',
                'abbreviation',
                'totalScore',
                'fullName'
            ],
            where: {
                id: {
                    $in: ids
                }
            },
            include: [{
                model: models.Address,
                as: 'addresses',
                attributes: [
                    'id'
                ],
                required: false,
                where: {
                    entityType: entityType.SCHOOL
                },
                include: [{
                    model: models.Area,
                    as: 'area',
                    attributes: [
                        'id',
                        'name'
                    ]
                }]
            }]
        }) :
        [];
};


module.exports = service;
