'use strict';

const lodash = require('lodash');

const scoreView = require('../../entity/views/scoreView'),
    metroView = require('../../geo/views/metroView'),
    geoView = require('../../geo/views/geoView'),
    areaView = require('../../geo/views/areaView'),
    districtView = require('../../geo/views/districtView'),
    addressView = require('../../geo/views/addressView'),
    FormatUtils = require('../../entity/lib/FormatUtils'),
    CourseOptionsTransformer = require('../lib/CourseOptionsTransformer'),
    pageView = require('../../entity/views/pageView'),
    costView = require('../views/costView');

const entityType = require('../../../../api/modules/entity/enums/entityType'),
    groupSizeTraining = require('../enums/groupSizeTraining'),
    courseImageSize = require('../enums/courseImageSize');

let view = {};

const FULL_DESCRIPTION_LENGTH = 300,
    LEARNING_OUTCOMES_NAME = 'Результаты обучения',
    BRAND_INDEX = 0;

/**
 * @param  {Object} course
 * @param  {string} categoryAlias
 * @return {Object}
 */
view.page = function(course, categoryAlias) {
    let options = course.courseOptions,
        generalOptions = this.formatGeneralOptions(course);
    return {
        id: course.id,
        name: course.name,
        category: categoryAlias,
        categoryName: course.courseType && course.courseType.category ?
            course.courseType.category.name :
            '',
        description: course.description,
        fullDescription: this.formatFullDescription(course.fullDescription),
        score: scoreView.results(course.score, course.totalScore).data,
        cost: costView.formatPageCost(
            options,
            course.courseType.category.priceType
        ),
        generalOptions: {
            items: this.formatGeneralOptionsWithConfig(generalOptions)
        },
        departmentList: this.formatDepartmentList(
            options,
            generalOptions,
            lodash.camelCase(course.courseType.category.priceType)
        ),
        videoId: course.embedId,
        imageUrl: course.imageUrl,
        online: this.onlineStatus(generalOptions)
    };
};

/**
 * @param  {string=} text
 * @return {Object}
 */
view.formatFullDescription = function(text) {
    let result = {
        cutText: []
    };

    if (text) {
        if (text.length > FULL_DESCRIPTION_LENGTH) {
            let formatUtils = new FormatUtils();
            result.fullText = [text];
            result.cutText.push(
                formatUtils.cutText(text, FULL_DESCRIPTION_LENGTH, ' ')
            );
        } else {
            result.cutText.push(text);
        }
    } else {
        result = null;
    }
    return result;
};

/**
 * @param  {Object} course
 * @return {Object}
 */
view.formatGeneralOptions = function(course) {
    let items = this.getStaticOptions(course),
        optionsTransformer = new CourseOptionsTransformer(course.courseOptions);

    return items.concat(optionsTransformer.getGeneralOptions());
};

/**
 * @param  {Array<Object>} options
 * @param  {Array<Object>} generalOptions
 * @param  {string}        priceType
 * @return {Array<Object>}
 */
view.formatDepartmentList = function(options, generalOptions, priceType) {
    let optionsTransformer = new CourseOptionsTransformer(options, priceType);
    return optionsTransformer.getUniqueOptions(generalOptions);
};

/**
 * @param  {Array<Object>}  generalOptions
 * @return {(string|undefined)}
 */
view.onlineStatus = function(generalOptions) {
    let online = generalOptions.find(option => option.key === 'online');
    return online && online.description === 'Онлайн' ? 'only' : undefined;
};

/**
 * @param {{
 *     courseBrand: {
 *         name: string,
 *         description: ?string
 *     },
 *     courseType: {
 *         name: string
 *     },
 *     entranceExam: ?string,
 *     learningOutcome: ?string,
 *     openSchedule: ?boolean
 * }} course
 * @return {Array<Object>}
 */
view.getStaticOptions = function(course) {
    let result = [];
    result.push({
        name: course.courseBrand.name,
        description: course.courseBrand.description
    });

    result.push({
        name: 'Направление',
        description: course.courseType.name
    });

    if (course.entranceExam) {
        result.push({
            name: 'Вступительнео расписание',
            description: course.entranceExam
        });
    }

    if (course.learningOutcome) {
        result.push({
            name: LEARNING_OUTCOMES_NAME,
            description: course.learningOutcome
        });
    }

    if (course.openSchedule) {
        result.push({
            name: 'Сроки записи',
            description:
                'Запись в новые и существующие группы ведётся постоянно'
        });
    }
    return result;
};


/**
 * @param {Array<{
 *     name: string,
 *     description: string,
 *     cost: (number|undefined)
 * }>} generalOptions
 * @return {Array<Object>}
 */
view.formatGeneralOptionsWithConfig = function(generalOptions) {
    return generalOptions.map((option, index) => {
        let isHorizontal = (BRAND_INDEX == index);
        return {
            data: option,
            config: {
                align: this.alignmentOption(option, isHorizontal)
            }
        };
    });
};


/**
 * @param {{
 *     name: string,
 *     description: string,
 *     cost: (number|undefined)
 * }} option
 * @param {boolean=} opt_isHorizontal
 * @return {string}
 */
view.alignmentOption = function(option, opt_isHorizontal) {
    let optionsNameHorizontally = [LEARNING_OUTCOMES_NAME];

    let isHorizontally = optionsNameHorizontally.some(optionName =>
        opt_isHorizontal || (optionName == option.name)
    );

    return isHorizontally ? 'horizontal' : 'vertical';
};

/**
 * @param {Object} course
 * @param {string} categoryAlias
 * @return {Object}
 */
view.pageMap = function(course, categoryAlias) {
    let addresses = lodash.flatten(course.courseOptions.map(courseOption =>
        courseOption.departments.map(department => {
            let address = department.address;
            return {
                addressId: address.id,
                coordinates: geoView.coordinatesDefault(address.coords),
                header: {
                    title: course.name
                },
                content: {
                    items: []
                },
                footer: {
                    title: address.name
                },
                id: course.id,
                category: categoryAlias,
                score: course.totalScore
            };
        })
    ));
    return {
        itemGroups: [{
            viewType: 'pin',
            items: addresses
        }]
    };
};

/**
 * @param  {Array<Object>} courses
 * @return {Object}
 */
view.list = function(courses) {
    return courses.reduce((prev, curr, i) => {
        let coursePosition = prev.findIndex(course => course.id === curr.id);
        if (~coursePosition) {
            prev[coursePosition] = this.joinListCourse(
                prev[coursePosition],
                curr
            );
        } else {
            prev.push(this.getListCourse(curr));
        }
        return prev;
    }, []);
};


/**
 * Group given courses from raw search query by addresses
 * @param  {Array<Object>} courses
 * @param  {string} viewType
 * @return {{
 *     itemGroups: Array<{Object}>
 * }}
 */
view.listMap = function(courses, viewType) {
    return courses.reduce((prev, curr) => {
        let addressPosition = prev.findIndex(
            course => course.addressId == curr.addressId
        );

        if (~addressPosition) {
            let isCourseAdded = ~prev[addressPosition].content.items.findIndex(
                mapCourse => mapCourse.id == curr.id
            );
            if (!isCourseAdded) {
                prev[addressPosition].content.items.push(this.mapCourse(curr));
            }
        } else {
            prev.push(this.getMapItem(curr));
        }

        return prev.filter(item => item);
    }, []);
};

/**
 * @param {{
 *    courses: Array<models.Course>,
 *    areas: Array<models.Area>,
 *    metro: Array<models.Metro>,
 *    districts: Array<models.District>
 * }} data
 * @return {{
 *     courses: Array<Object>,
 *     areas: Array<Object>,
 *     metro: Array<Object>,
 *     districts: Array<Object>
 * }}
 */
view.suggest = function(data) {
    return {
        courses: this.suggestList(data.courses),
        areas: areaView.list(data.areas),
        metro: metroView.list(data.metros),
        districts: districtView.list(data.districts)
    };
};

/**
 * @param  {Array<Object>} courses
 * @return {Array<Object>}
 */
view.suggestList = function(courses) {
    return courses.map(course => ({
        id: course.id,
        alias: this.generateAlias(
            course.alias,
            course.brandAlias,
            course.categoryAlias
        ),
        name: course.name,
        score: course.score || [0, 0, 0, 0],
        totalScore: course.totalScore,
        addresses: this.getAddresses(course.courseOptions)
    }));
};

/**
 * @param  {Array<Object>} courseOptions
 * @return {Array<Object>}
 */
view.getAddresses = function(courseOptions) {
    return lodash.flatten(courseOptions.map(courseOption =>
        courseOption.departments.map(department =>
            department.address
        )
    ));
};

/**
 * Generate map item from course object
 * @param  {Object} course
 * @return {{
 *     addressId: number,
 *     addressName: string,
 *     coordinates: Array<number>,
 *     score: number,
 *     title: {
 *         id: number,
 *         text: string,
 *         url: null
 *     },
 *     subtitle: string,
 *     items: Array<{
 *         id: number,
 *         name: {
 *             light: string,
 *             bold: ?string
 *         },
 *         url: null
 *     }>
 * }}
 */
view.getMapItem = function(course) {
    return course.addressId ? {
        addressId: course.addressId,
        coordinates: geoView.coordinatesDefault(
            course.addressCoords),
        score: course.totalScore,
        title: {
            id: course.brandId,
            text: course.brand,
            url: null
        },
        header: {
            title: course.brand
        },
        content: {
            title: 'Курсы',
            items: [this.mapCourse(course)]
        },
        footer: {
            title: course.addressName
        }
    } :
    null;
};


/**
 * Create course object for map
 * @param  {Object} course
 * @return {{
 *     id: number,
 *     name: {
 *         light: string,
 *         bold: ?string
 *     },
 *     url: string
 * }}
 */
view.mapCourse = function(course) {
    return {
        id: course.id,
        name: {
            light: course.name
        },
        category: course.categoryAlias,
        url: this.generateAlias(
            course.alias,
            course.brandAlias,
            course.categoryAlias
        )
    };
};


/**
 * @param  {Object} course
 * @return {Object}
 */
view.getListCourse = function(course) {
    return {
        id: course.id,
        alias: this.generateAlias(
            course.alias,
            course.brandAlias,
            course.categoryAlias
        ),
        imageUrl: course.imageUrl ? course.imageUrl.replace(
            '{width}',
            courseImageSize.DEFAULT[1]
        ) :
        null,
        type: entityType.COURSE,
        name: {light: course.name},
        description: course.description,
        brand: course.brand,
        score: scoreView.results(
            course.score,
            course.totalScore
        ),
        cost: costView.formatListCost(course.optionCost, course.priceType),
        online: course.optionOnline ? {
            value: groupSizeTraining.ONLINE,
            type: 'only'
        } :
        {},
        addresses: [course.addressId],
        metro: course.metroId ? [{
            id: course.metroId,
            name: metroView.formatName(course.metroName)
        }] :
        [],
        area: course.areaId ? [{
            id: course.areaId,
            name: course.areaName
        }] : [],
        category: course.categoryAlias
    };
};

/**
 * @param  {Object} existingCourse
 * @param  {Object} newCourse
 * @return {Object}
 */
view.joinListCourse = function(existingCourse, newCourse) {
    if (newCourse.optionCost < existingCourse.cost.value) {
        existingCourse.cost.value = newCourse.optionCost;
    }

    if (existingCourse.online.type === 'only' && !newCourse.optionOnline ||
        !existingCourse.online.type && newCourse.optionOnline
    ) {
        existingCourse.online = {
            value: groupSizeTraining.ONLINE,
            type: 'available'
        };
    }

    if (newCourse.areaId &&
        !existingCourse.area.find(area => area.id === newCourse.areaId)) {
        existingCourse.area.push({
            id: newCourse.areaId,
            name: newCourse.areaName
        });
    }

    if (!~existingCourse.addresses.indexOf(newCourse.addressId) &&
        newCourse.metroId &&
        !existingCourse.metro.find(metro => metro.id === newCourse.metroId)
    ) {
        existingCourse.addresses.push(newCourse.addressId);
        existingCourse.metro.push({
            id: newCourse.metroId,
            name: metroView.formatName(newCourse.metroName)
        });
    }

    return existingCourse;
};

/**
 * @param  {string} alias
 * @param  {string} brandAlias
 * @param  {string} categoryAlias
 * @return {string}
 */
view.generateAlias = function(alias, brandAlias, categoryAlias) {
    return `${categoryAlias}/${brandAlias}/${alias}`;
};


/**
 * @param {{
 *     name: string,
 *     phone: string,
 *     comment: ?string
 * }} data
 * @return {Object}
 */
view.letterData = function(data) {
    return {
        theme: 'Запись на курс',
        content: this.letterContent(data)
    };
};

/**
 * @param  {{
 *     applicationId: number,
 *     name: string,
 *     phone: string,
 *     email: string,
 *     link: string,
 *     comment: ?string,
 *     department: Object
 * }} data
 * @return {string}
 */
view.letterContent = function(data) {
    let result = '',
        comment = data.comment ? `<br>Комментарий: ${data.comment}` : '',
        departmentOptions = data.department.option,
        option = '';

    if (departmentOptions) {
        option = `<br>Адрес: ${data.department.name}`;
        option += this.formatFeature(departmentOptions.title);
        option += this.formatFeature(departmentOptions.cost);
        departmentOptions.features.map(feature => {
            option += this.formatFeature(feature);
        });
    }

    result += `<div>Номер заявки: ${data.applicationId}`;
    result += `<br>Ссылка: ${data.link}`;
    result += `<br>Имя: ${data.name}`;
    result += `<br>Телефон: ${data.phone}`;
    result += `<br>e-mail: ${data.email}`;
    result += comment;
    result += option;
    result += '</div>';

    return result;
};

/**
 * [formatFeature description]
 * @param  {{
 *     name: string,
 *     value: string
 * }} feature
 * @return {string}
 */
view.formatFeature = function(feature) {
    return `<br>${feature.name}: ${feature.value}`;
};


/*
 * Used for item of list favorites
 * @param {{
 *     entity: models.Course,
 *     type: string,
 *     url: models.Page
 * }} data
 * @return {{
 *     id: number,
 *     type: string,
 *     name: {
 *         light: string,
 *         bold: ?string
 *     },
 *     alias: string,
 *     score: number,
 *     metro: ?Array<{
 *         id: number,
 *         name: string
 *     }>,
 *     area: ?Array<{
 *         id: number,
 *         name: string
 *     }>,
 *     category: string
 * }}
 */
view.item = function(data) {
    var course = data.entity,
        type = data.type;

    var addresses = this.getAddresses(course.courseOptions);

    return {
        id: course.id,
        type: type,
        name: {light: course.name},
        score: course.totalScore,
        metro: addressView.nearestMetro(addresses),
        area: [addressView.getArea(addresses)[0]],
        alias: this.generateAlias(
            data.alias.alias,
            data.brandAlias.alias,
            data.categoryAlias.alias
        ),
        category: 'proforientacija'
    };
};

/**
 * @typedef {{
 *     entityId: number,
 *     alias: string
 * }} EntityAlias
 * @param  {Array<Course>} courses
 * @param  {{
 *     course: Array<EntityAlias>,
 *     brand: Array<EntityAlias>,
 *     category: Array<EntityAlias>
 * }} aliases
 * @return {Array<Object>}
 */
view.joinAliases = function(courses, aliases) {
    let aliasedCourses = pageView.joinAliases(courses, aliases.course),
        brandAliasedCourses = pageView.joinAliases(
            aliasedCourses,
            aliases.brand, {
                outputField: 'brandAlias',
                inputId: 'brandId'
            }
        ),
        categoryAliasedCourses = pageView.joinAliases(
            brandAliasedCourses,
            aliases.category, {
                outputField: 'categoryAlias',
                inputId: 'categoryId'
            }
        );

    return categoryAliasedCourses;
};

/**
 * @param  {Course} course
 * @return {Object}
 */
view.render = function(course) {
    let courseType = course.courseType || {
        id: null,
        name: null,
        category: {
            id: null,
            name: null
        }
    };
    return {
        id: course.id,
        name: course.name,
        description: course.description,
        brandId: course.courseBrand.id,
        brandName: course.courseBrand.name,
        categoryId: courseType.category.id,
        categoryName: courseType.category.name,
        type: courseType.id,
        typeName: courseType.name,
        fullDescription: course.fullDescription,
        about: course.about,
        learningOutcome: course.learningOutcome,
        isActive: course.dataValues.isActive,
        embedId: course.embedId,
        image: course.imageUrl,
        updatedAt: course['updated_at']
    };
};

/**
 * @param  {Array<Course>} courses
 * @return {Array<Object>}
 */
view.renderList = function(courses) {
    return courses.map(this.render);
};

module.exports = view;
