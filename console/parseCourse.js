'use strict';

var async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    path = require('path'),
    commander = require('commander'),
    xlsxj = require('xlsx-to-json');

var services = require('../app/components/services').all,
    sequelize = require('../app/components/db');

const SHEETS = ['Курсы', 'Опции', 'Адреса центров', 'О компании'],
    WEEK_DAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

class CourseParser {
    /**
     * @param {string} filePath
     */
    parse(filePath) {
        var data = this.readFile_(filePath),
            brandName = path.parse(filePath).name;

        var courses = this.formatCourses_(brandName, data);

        sequelize.options.logging = false;
        try {
            courses.map(course =>
                await(services.course.create(course))
            );
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @private
     * @param {string} filePath
     * @return {Object}
     */
    readFile_(filePath) {
        return await({
            courses: this.openSheet_(filePath, SHEETS[0]),
            options: this.openSheet_(filePath, SHEETS[1]),
            departments: this.openSheet_(filePath, SHEETS[2]),
            brand: this.openSheet_(filePath, SHEETS[3])
        });
    }

    /**
     * @private
     * @param {string} filePath
     * @param {string} name
     * @return {Promise<Array<Object>>}
     */
    openSheet_(filePath, name) {
        var options = {
            input: filePath,
            output: null,
            sheet: name
        };
        return new Promise((resolve, reject) => {
            xlsxj(options, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    /**
     * @param {string} brandName
     * @param {{
     *     courses: Array<Object>,
     *     options: Array<Object>,
     *     departments: Array<Object>,
     *     brand: Array<Object>
     * }} data
     * @return {Array<Object>}
     */
    formatCourses_(brandName, data) {
        let brand = data.brand[0];

        data.options = data.options.map(option =>
            this.formatOption_(option, data.departments)
        );

        return data.courses
            .map(course => {
                course.brand = {
                    name: brandName,
                    description: brand.description
                };
                course.options = course.options.split(',').map(id =>
                    data.options.find(option => option.optionId == id)
                );
                return course;
            })
            .filter(course => course.name);
    }

    /**
     * @param {Object} option
     * @param {Array<Object>} departments
     * @return {Object}
     */
    formatOption_(option, departments) {
        option.age = option.age.split(',');
        option.costPerHour = option.costPerHour === '' ?
            null :
            Number(option.costPerHour).toFixed(0);
        option.totalCost = option.totalCost === '' ? null : option.totalCost;
        option.schedule = this.formatSchedule_(option.schedule);
        option.departments = option.departments.split(',').map(id =>
            departments.find(department => department.departmentId == id)
        );

        return option;
    }

    /**
     * @param {string} schedule
     * @return {Array<Object>}
     */
    formatSchedule_(schedule) {
        var scheduleDays = schedule.split(';');
        return scheduleDays.map(scheduleDay =>
            this.formatDay_(scheduleDay.trim())
        );
    }

    /**
     * @param {string} day
     * @return {Object}
     */
    formatDay_(day) {
        var scheduleFields = day.split(',').map(field => field.trim());
        return {
            day: WEEK_DAYS.indexOf(scheduleFields[0].toLowerCase()),
            startTime: scheduleFields[1] || null,
            endTime: scheduleFields[2] || null
        };
    }
}

/**
 * @param {string} filePath
 */
var parseCourse = async(function(filePath) {
    var courseParser = new CourseParser();

    await(courseParser.parse(filePath));
});

commander
    .command('parseCourse')
    .description('Parse courses from xlsx')
    .action((filePath) => parseCourse(filePath));

exports.Command;
