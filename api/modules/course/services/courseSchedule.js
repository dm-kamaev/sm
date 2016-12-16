'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const models = require('../../../../app/components/models').all,
    ScheduleFormatError = require('../controllers/errors/ScheduleFormatError');

let service = {
    name: 'courseSchedule'
};

const WEEK_DAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

/**
 * @param {number} courseOptionId
 * @param (Array<{
 *     startTime: ?string,
 *     endTime: ?string,
 *     day: number
 * }>|string) data
 * @param {Object=} opt_transaction
 * @return {Array<CourseSchedule>}
 */
service.bulkCreate = async(function(courseOptionId, data, opt_transaction) {
    let schedule;
    try {
        schedule = typeof data == 'string' ?
            service.formatSchedule(data) :
            data;
    } catch (error) {
        throw new ScheduleFormatError(JSON.stringify(data));
    }
    return await(models.CourseSchedule.bulkCreate(
        schedule.map(item => {
            item.courseOptionId = courseOptionId;
            return item;
        }), {
            transaction: opt_transaction
        }
    ));
});

/**
 * @param  {string} schedule
 * @return {Array<Object>}
 */
service.formatSchedule = function(schedule) {
    let scheduleDays = schedule && schedule.split(';');
    return schedule ?
        scheduleDays.map(scheduleDay => service.formatDay(scheduleDay.trim())) :
        undefined;
};

/**
 * @param  {string} day
 * @return {Object}
 */
service.formatDay = function(day) {
    let scheduleFields = day.split(',').map(field => field.trim()),
        weekday = WEEK_DAYS.indexOf(scheduleFields[0].toLowerCase());
    if (weekday == -1) {
        throw new Error(`${scheduleFields[0]} is not valid`);
    }
    return {
        day: weekday,
        startTime: scheduleFields[1] || null,
        endTime: scheduleFields[2] || null
    };
};

/**
 * @param {number} optionId
 * @param {Object=} opt_transaction
 */
service.deleteByOptionId = async(function(optionId, opt_transaction) {
    await(models.CourseSchedule.destroy({
        where: {
            courseOptionId: optionId
        },
        transaction: opt_transaction
    }));
});

module.exports = service;
