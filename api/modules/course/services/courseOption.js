'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const sequelize = require('../../../../app/components/db'),
    models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all;

let service = {
    name: 'courseOption'
};

/**
 * @param {Course} course
 * @param {{
 *     name: ?string,
 *     description: ?string,
 *     totalCost: ?number,
 *     costPerHour: ?number,
 *     online: ?boolean,
 *     age: ?number,
 *     maxGroupSize: ?integer,
 *     currentGroupSize: ?integer,
 *     nativeSpeaker: ?boolean,
 *     startDate: ?string
 *     duration: ?string,
 *     openSchedule: ?boolean,
 *     schedule: ?(Array<{
 *         startTime: ?string,
 *         endTime: ?string,
 *         day: number
 *     }>|string),
 *     departments: Array<{
 *         name: ?string,
 *         description: ?string,
 *         phone: ?string,
 *         address: string,
 *         area: string
 *     }|number>
 * }} data
 * @return {CourseOption}
 */
service.create = async(function(course, data) {
    let transaction = await(sequelize.transaction());

    let courseOption;
    try {
        courseOption = await(models.CourseOption.create({
            courseId: course.id,
            name: data.name,
            description: data.description,
            totalCost: data.totalCost,
            costPerHour: data.costPerHour,
            online: data.online,
            age: data.age,
            maxGroupSize: data.maxGroupSize,
            currentGroupSize: data.currentGroupSize,
            nativeSpeaker: data.nativeSpeaker,
            startDate: data.startDate,
            duration: data.duration,
            openSchedule: data.openSchedule,
            lengthWeeks: data.lengthWeeks
        }, {
            transaction: transaction
        }));
        if (!data.openSchedule && data.schedule) {
            courseOption.schedule = await(services.courseSchedule.bulkCreate(
                courseOption.id,
                data.schedule,
                transaction
            ));
        }
        await(courseOption.setDepartments(data.departments.map(department =>
            !Number.isNaN(Number(department)) ?
                department :
                await(services.courseDepartment.findOrCreate(
                    course.brandId,
                    department
                ))
        ), {
            transaction: transaction
        }));

        await(transaction.commit());
    } catch (error) {
        await(transaction.rollback());
        throw error;
    }

    return courseOption;
});

/**
 * @param  {number} courseId
 * @return {Array<CourseOption>}
 */
service.getByCourseId = async(function(courseId) {
    return await(models.CourseOption.findAll({
        attributes: {
            include: [
                [sequelize.literal(true), 'isActive']
            ]
        },
        where: {
            courseId: courseId
        },
        include: [{
            model: models.CourseSchedule,
            as: 'schedule'
        }, {
            model: models.CourseDepartment,
            as: 'departments',
            through: 'course_option_course_department'
        }]
    }));
});

/**
 * @param  {number} id
 * @return {CourseOption}
 */
service.getById = async(function(id) {
    return await(models.CourseOption.findOne({
        where: {
            id: id
        },
        include: [{
            model: models.CourseSchedule,
            as: 'schedule'
        }, {
            model: models.CourseDepartment,
            as: 'departments',
            through: 'course_option_course_department'
        }]
    }));
});

/**
 * @param  {number} id
 * @param  {CourseOption} data
 * @return {Array<number>}
 */
service.update = async(function(id, data) {
    let courseOption = await(service.getById(id));

    let transaction = await(sequelize.transaction());

    try {
        await(courseOption.update({
            name: data.name,
            totalCost: data.totalCost,
            costPerHour: data.costPerHour,
            online: data.online,
            age: data.age,
            maxGroupSize: data.maxGroupSize,
            lengthWeeks: data.lengthWeeks,
            nativeSpeaker: data.nativeSpeaker,
            startDate: data.startDate,
            duration: data.duration,
            openSchedule: data.openSchedule,
            currentGroupSize: data.currentGroupSize
        }, {
            transaction: transaction
        }));

        await(services.courseSchedule.deleteByOptionId(id, transaction));
        if (!data.openSchedule && data.schedule) {
            courseOption.schedule = await(services.courseSchedule.bulkCreate(
                courseOption.id,
                data.schedule,
                transaction
            ));
        }

        await(courseOption.setDepartments(
            data.departments, {
                transaction: transaction
            }
        ));

        await(transaction.commit());
    } catch (error) {
        await(transaction.rollback());
        throw error;
    }

    return courseOption;
});

/**
 * @param {number} id
 */
service.delete = async(function(id) {
    await(models.CourseOption.destroy({
        where: {
            id: id
        }
    }));
});

module.exports = service;
