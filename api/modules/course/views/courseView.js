'use strict';

const lodash = require('lodash');

const scoreView = require('./scoreView'),
    metroView = require('../../geo/views/metroView'),
    geoView = require('../../geo/views/geoView'),
    areaView = require('../../geo/views/areaView'),
    districtView = require('../../geo/views/districtView'),
    FormatText = require('../../entity/lib/FormatText'),
    CourseOptions = require('../lib/CourseOptions');

let view = {};

const FULL_DESCRIPTION_LENGTH = 300;

/**
 * @param  {Object} course
 * @return {Object}
 */
view.page = function(course) {
    return {
        id: course.id,
        name: course.name,
        description: course.description,
        fullDescription: this.formatFullDescription(course.fullDescription),
        score: scoreView.results(course.score, course.totalScore).data,
        cost: this.formatCost(course.courseOptions),
        generalOptions: this.formatGeneralOptions(course)
    };
};

/**
 * @param  {string} text
 * @return {Object}
 */
view.formatFullDescription = function(text) {
    let result = {};
    if (text.length > FULL_DESCRIPTION_LENGTH) {
        let formatText = new FormatText();
        result.fullText = text;
        result.cutText = formatText.cut(text, FULL_DESCRIPTION_LENGTH, ' ');
    } else {
        result.cutText = text;
    }
    return result;
};

/**
 * @param  {Array<Object>} options
 * @return {string}
 */
view.formatCost = function(options) {
    return Math.min.apply(null, options.map(option => option.totalCost)) +
        ' руб. / курс';
};

/**
 * @param  {Object} course
 * @return {Object}
 */
view.formatGeneralOptions = function(course) {
    let items = [],
        courseOptions = new CourseOptions(course.courseOptions);

    items.push({
        name: course.courseBrand.name,
        description: course.courseBrand.description
    });

    if (course.entranceExam) {
        items.push({
            name: 'Вступительнео расписание',
            description: course.entranceExam
        });
    }

    if (course.learningOutcome) {
        items.push({
            name: 'Результаты обучения',
            description: course.learningOutcome
        });
    }

    if (course.openSchedule) {
        items.push({
            name: 'Сроки записи',
            description:
                'Запись в новые и существующие группы ведётся постоянно'
        });
    }

    return {
        items: items.concat(courseOptions.getGeneralOptions())
    };
};

/**
 * @param  {Object} course
 * @return {Object}
 */
view.pageMap = function(course) {
    let addresses = lodash.flatten(course.courseOptions.map(courseOption =>
        courseOption.departments.map(department => {
            let address = department.address;
            return {
                addressId: address.id,
                coordinates: address.coords,
                title: {
                    text: course.courseBrand.name
                },
                items: [],
                description: address.name,
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
            let isCourseAdded = ~prev[addressPosition].items.findIndex(
                mapCourse => mapCourse.id == curr.id
            );
            if (!isCourseAdded) {
                prev[addressPosition].items.push(this.mapCourse(curr));
            }
        } else {
            prev.push(this.getMapItem(curr));
        }

        return prev;
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
        alias: 'undefined',
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
 *         content: string,
 *         url: null
 *     }>
 * }}
 */
view.getMapItem = function(course) {
    return {
        addressId: course.addressId,
        addressName: course.addressName,
        coordinates: geoView.coordinatesDefault(
            course.addressCoords),
        score: course.totalScore,
        title: {
            id: course.brandId,
            text: course.brand,
            url: null
        },
        subtitle: course.addressName,
        items: [this.mapCourse(course)]
    };
};


/**
 * Create course object for map
 * @param  {Object} course
 * @return {{
 *     id: number,
 *     content: string,
 *     url: string
 * }}
 */
view.mapCourse = function(course) {
    return {
        id: course.id,
        content: course.name,
        url: null
    };
};


/**
 * @param  {Object} course
 * @param  {string} type
 * @return {Object}
 */
view.getListCourse = function(course, type) {
    return {
        id: course.id,
        type: type,
        name: {light: course.name},
        description: course.description,
        brand: course.brand,
        score: scoreView.results(
            course.score,
            course.totalScore
        ),
        cost: course.optionCost,
        online: course.optionOnline ? 'only' : null,
        addresses: [course.addressId],
        metro: course.metroId ? [{
            id: course.metroId,
            name: metroView.formatName(course.metroName)
        }] :
        [],
        area: [{
            id: course.areaId,
            name: course.areaName
        }]
    };
};

/**
 * @param  {Object} existingCourse
 * @param  {Object} newCourse
 * @return {Object}
 */
view.joinListCourse = function(existingCourse, newCourse) {
    if (newCourse.optionCost < existingCourse.cost) {
        existingCourse.cost = newCourse.optionCost;
    }

    if (
        existingCourse.online === 'only' && !newCourse.optionOnline ||
        !existingCourse.online && newCourse.optionOnline === 'only'
    ) {
        existingCourse.online = 'available';
    }

    if (!existingCourse.area.find(area => area.id === newCourse.areaId)) {
        existingCourse.area.push({
            id: newCourse.areaId,
            name: newCourse.areaName
        });
    }

    if (
        !~existingCourse.addresses.indexOf(newCourse.addressId) &&
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

module.exports = view;
