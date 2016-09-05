var scoreView = require('./scoreView'),
    metroView = require('../../geo/views/metroView');

/**
 * @param {Array<Object>} courses
 * @return {Object}
 */
exports.list = function(courses) {
    return courses.reduce((prev, curr, i) => {
        var coursePosition = prev.findIndex(course => course.id === curr.id);
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
 * @param {Object} course
 * @param {string} type
 * @return {Object}
 */
exports.getListCourse = function(course, type) {
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
 * @param {Object} existingCourse
 * @param {Object} newCourse
 * @return {Object}
 */
exports.joinListCourse = function(existingCourse, newCourse) {
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
