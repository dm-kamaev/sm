'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    squel = require('squel'),
    url = require('url');

const sequelize = require('../../../../app/components/db'),
    models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all,
    error = require('../../entity/lib/Error'),
    entityType = require('../../entity/enums/entityType'),
    pageView = require('../../entity/views/pageView');

let service = {
    name: 'course'
};

const informationFields = {
    COURSE: [
        'id',
        'name',
        'totalScore',
        'score',
        'scoreCount',
        'description',
        'fullDescription',
        'entranceExam',
        'learningOutcome',
        'leadType'
    ],
    BRAND: ['id', 'name', 'description'],
    TYPE: ['id', 'name'],
    OPTION: [
        'id',
        'totalCost',
        'age',
        'maxGroupSize',
        'currentGroupSize',
        'lengthWeeks',
        'online',
        'name',
        'description',
        'duration',
        'costPerHour',
        'startDate'
    ],
    SCHEDULE: ['day', 'startTime', 'endTime'],
    DEPARTMENT: ['id'],
    ADDRESS: ['id', 'name', 'coords'],
    METRO: ['id', 'name']
};

/**
 * @param {{
 *     name: string,
 *     description: ?string,
 *     fullDescription: ?string,
 *     about: ?string,
 *     entranceExam: ?string,
 *     learningOutcome: ?string,
 *     leadType: string,
 *     category: string,
 *     type: string,
 *     brand: {
 *         name: string,
 *         description: ?string
 *     }
 *     options: Array<{
 *         name: ?string,
 *         description: ?string,
 *         totalCost: ?number,
 *         costPerHour: ?number,
 *         online: ?boolean,
 *         age: ?number,
 *         maxGroupSize: ?integer,
 *         currentGroupSize: ?integer,
 *         nativeSpeaker: ?boolean,
 *         startDate: ?string,
 *         duration: ?string,
 *         openSchedule: ?boolean,
 *         schedule: ?Array<{
 *             startTime: ?string,
 *             endTime: ?string,
 *             day: number
 *         }>,
 *         departments: Array<{
 *             name: ?string,
 *             description: ?string,
 *             phone: ?string,
 *             address: string
 *         }
 *     }>
 * }} data
 * @return {Course}
 */
service.fullCreate = async(function(data) {
    let brand = await(services.courseBrand.create(data.brand)),
        category = await(services.courseCategory.findOrCreate(data.category)),
        type = await(services.courseType.create(category.id, data.type)),
        course = await(models.Course.create({
            name: data.name,
            brandId: brand.id,
            type: type.id,
            description: data.description,
            fullDescription: data.fullDescription,
            about: data.about,
            entranceExam: data.entranceExam,
            learningOutcome: data.learningOutcome,
            leadType: data.leadType
        }));
    course.options = data.options.map(option =>
        await(services.courseOption.create(course, option))
    );

    return course;
});

/**
 * @type {number} id
 * @return {Course}
 */
service.information = async(function(id) {
    let optionInclude = [{
        attributes: informationFields.SCHEDULE,
        model: models.CourseSchedule,
        as: 'schedule'
    }, {
        attributes: informationFields.DEPARTMENT,
        model: models.CourseDepartment,
        as: 'departments',
        include: [{
            attributes: informationFields.ADDRESS,
            model: models.Address,
            as: 'address',
            required: false,
            where: {
                entityType: entityType.COURSE_DEPARTMENT
            },
            include: [{
                attributes: informationFields.METRO,
                model: models.Metro,
                as: 'metroStations'
            }]
        }]
    }];

    return models.Course.findOne({
        attributes: informationFields.COURSE,
        where: {
            id: id
        },
        include: [{
            attributes: informationFields.BRAND,
            model: models.CourseBrand,
            as: 'courseBrand'
        }, {
            attributes: informationFields.TYPE,
            model: models.CourseType,
            as: 'courseType'
        }, {
            attributes: informationFields.OPTION,
            model: models.CourseOption,
            as: 'courseOptions',
            include: optionInclude
        }]
    });
});

/**
 * @param {Object} searchParams
 * @param {number=} opt_limit
 * @return {Array<Object>}
 */
service.list = async(function(searchParams, opt_limit) {
    let searchString = services.courseSearchData.getSearchSql(
        searchParams,
        opt_limit
    );

    let courses = await(sequelize.query(
        searchString, {
            type: sequelize.QueryTypes.SELECT
        }
    ));

    return courses;
});

/**
 * Search with given parameters for map
 * @param {Object} searchParams
 * @param {number=} opt_limit
 * @return {Array<Object>}
 */
service.listMap = async(function(searchParams, opt_limit) {
    let searchString = services.courseSearchData.getSearchMapSql(
        searchParams,
        opt_limit
    );

    let courses = await(sequelize.query(
        searchString, {
            type: sequelize.QueryTypes.SELECT
        }
    ));

    return courses;
});

/**
 * @param {number} departmentId
 * @return {Array<number>}
 */
service.findByDepartmentId = async(function(departmentId) {
    let query = squel.select()
        .from('course')
        .field('DISTINCT course.id')
        .left_join('course_option', null, 'course.id = course_option.course_id')
        .left_join(
            'course_option_course_department',
            null,
            'course_option.id = ' +
                'course_option_course_department.course_option_id'
        )
        .left_join(
            'course_department',
            null,
            'course_option_course_department.course_department_id = ' +
                'course_department.id'
        )
        .where('course_department_id = ' + departmentId)
        .toString();
    let result = await(sequelize.query(
        query, {
            type: sequelize.QueryTypes.SELECT
        }
    ));

    return result.map(item => item.id);
});


/**
 * @return {Array<Course>}
 */
service.getAll = async(function() {
    return await(models.Course.findAll({
        include: [{
            model: models.CourseBrand,
            as: 'courseBrand'
        }, {
            model: models.CourseType,
            as: 'courseType',
            include: [{
                model: models.CourseCategory,
                as: 'category'
            }]
        }, {
            model: models.CourseOption,
            as: 'courseOptions',
            include: [{
                model: models.CourseDepartment,
                as: 'departments',
                through: 'course_option_course_department'
            }, {
                model: models.CourseSchedule,
                as: 'schedule'
            }]
        }]
    }));
});


/**
 * @param  {Array<number>} ids
 * @param  {{
 *     metro: ?boolean
 * }} opt_include
 * @return {Array<Object>}
 */
service.getByIds = function(ids, opt_include) {
    let addressInclude = [{
            model: models.Area,
            as: 'area',
            attributes: ['id', 'name']
        }],
        order = [];

    if (opt_include && opt_include.metro) {
        addressInclude.push({
            model: models.AddressMetro,
            as: 'addressMetroes',
            attributes: ['id', 'distance'],
            include: [{
                model: models.Metro,
                as: 'metro'
            }]
        });
        order = this.getDistanceOrder();
    }

    return ids.length ?
        models.Course.findAll({
            attributes: ['id', 'name', 'totalScore', 'brandId'],
            where: {
                id: {
                    $in: ids
                }
            },
            include: [{
                model: models.CourseOption,
                as: 'courseOptions',
                attributes: ['id'],
                include: [{
                    model: models.CourseDepartment,
                    as: 'departments',
                    through: 'course_option_course_department',
                    attributes: ['id'],
                    include: [{
                        model: models.Address,
                        as: 'address',
                        required: false,
                        where: {
                            entityType: entityType.COURSE_DEPARTMENT
                        },
                        attributes: ['id'],
                        include: addressInclude
                    }]
                }]
            }],
            order: order
        }) :
        [];
};

/**
 * Get metro distance order
 * @return {Array<Object>}
 */
service.getDistanceOrder = function() {
    let courseOption = {
            model: models.CourseOption,
            as: 'courseOptions'
        },
        courseDepartment = {
            model: models.CourseDepartment,
            as: 'departments'
        },
        address = {
            model: models.Address,
            as: 'address'
        },
        addressMetro = {
            model: models.AddressMetro,
            as: 'addressMetroes'
        };
    return [
        ['id', 'ASC'],
        [courseOption, 'id', 'ASC'],
        [courseOption, courseDepartment, 'id', 'ASC'],
        [courseOption, courseDepartment, address, 'id', 'ASC'],
        [
            courseOption,
            courseDepartment,
            address,
            addressMetro,
            'distance',
            'ASC'
        ]
    ];
};

/**
 * @param  {number} brandId
 * @return {Array<number>}
 */
service.getByBrandId = function(brandId) {
    return await(models.Course.findAll({
        attributes: ['id'],
        where: {
            brandId: brandId
        }
    }));
};

/**
 * @param {{
 *     name: string,
 *     phone: string,
 *     comment: ?string,
 *     link: string,
 *     department: Array<Object>
 * }} data
 * @return {Object}
 */
service.enrollOnCourse = async(function(data) {
    if (!data.name) {
        error.throwValidation('name', 'Необходимо заполнить поле имя');
    } else if (!data.phone) {
        error.throwValidation('phone', 'Необходимо заполнить поле телефон');
    } else if (data.comment && data.comment.length > 300) {
        error.throwValidation(
            'comment',
            'Длина комментария не должна превышать 300 символов'
        );
    }
    let application = await(services.courseApplication.create({
        username: data.name,
        phone: data.phone,
        comment: data.comment,
        alias: url.parse(data.link).pathname,
        option: JSON.stringify(data.department)
    }));

    data.applicationId = application.id;

    return data;
});

/**
 * @param {Array<Object>} courses
 * @return {Object}
 */
service.getAliases = async(function(courses) {
    let getAliases = services.page.getAliases,
        uniqueIds = pageView.uniqueIds;
    return await({
        course: getAliases(
            uniqueIds(courses),
            entityType.COURSE
        ),
        brand: getAliases(
            uniqueIds(courses.map(course => ({
                id: course.brandId
            }))),
            entityType.COURSE_BRAND
        )
    });
});

/**
 * @param  {number} id
 * @return {Course}
 */
service.getById = async(function(id) {
    return await(models.Course.findOne({
        where: {
            id: id
        },
        include: [{
            model: models.CourseBrand,
            as: 'courseBrand'
        }]
    }));
});

/**
 * @param  {{
 *     name: string,
 *     brandId: number,
 *     type: number,
 *     description: ?string,
 *     fullDescription: ?string,
 *     about: ?string,
 *     entranceExam: ?string,
 *     learningOutcome: ?string,
 *     leadType: ?string
 * }} data
 * @return {Course}
 */
service.create = async(function(data) {
    return await(models.Course.create(data));
});

/**
 * @param  {number} id
 * @param  {data} Object
 * @return {Array<number>}
 */
service.update = async(function(id, data) {
    return await(models.Course.update(data, {
        where: {
            id: id
        },
        individualHooks: true
    }));
});

/**
 * @param  {number} id
 */
service.delete = async(function(id) {
    let course = await(models.Course.findOne({
        where: {
            id: id
        }
    }));
    await(course.destroy());
});

/*
 * @param {Course} course
 */
service.deleteAlias = async(function(course) {
    await(services.page.delete(
        course.id,
        entityType.COURSE
    ));
});

module.exports = service;
