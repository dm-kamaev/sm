'use strict';

const async = require('asyncawait/async');
const await = require('asyncawait/await');
const sequelize = require('../../app/components/db');
const squel = require('squel');


module.exports = {
    up: async(function() {
        var userData = await(getAllUserData());
        var updatedUserData = updateUserDataItems(userData);
        await(updateDbUserData(updatedUserData));
    }),
    down: async(function(queryInterface) {

    })
};


/**
 * Get all user data from db
 * @return {Array.<Object>}
 */
var getAllUserData = function() {
    var allUserDataQuery = squel.select()
        .from('user_data')
        .toString();

    return sequelize.query(
        allUserDataQuery,
        {
            type: sequelize.QueryTypes.SELECT
        }
    );
};


/**
 * Calculate current grade (if needed) for user data and return
 * array of updated user data
 * @param {Array.<Object>} userData
 * @return {Array.<Object>} userData
 */
var updateUserDataItems = function(userData) {
    var updatedUserData = userData
        .filter(isUpdateNeeded)
        .map(updateUserDataItem);

    return updatedUserData;
};


/**
 * Return true if item need to update
 * @param {Object} item
 * @return {boolean}
 */
var isUpdateNeeded = function(item) {
    return (item.user_type == 'Parent' ||
        item.user_type == 'Scholar') &&
        item.year_graduate;
};


/**
 * Update each user data item
 * @param {Object} item
 * @return {{
 *     id: number,
 *     grade: (number|null)
 * }}
 */
var updateUserDataItem = function(item) {
    return {
        id: item.id,
        grade: calculateGrade(item.year_graduate, item.created_at)
    };
};


/**
 * Calculates current grade for user
 * @param {number} graduateYear
 * @param {string|Date} creationDate
 * @return {number|null}
 */
var calculateGrade = function(graduateYear, creationDate) {
    var currentYear = new Date().getFullYear(),
        creationMonth = new Date(creationDate).getMonth(),
        admissionYear = graduateYear - 11;

    var grade = creationMonth > 4 ?
        currentYear - admissionYear :
        currentYear - admissionYear - 1;

    return (grade <= 11 && grade > 0) ?
        grade :
        null;
};


/**
 * Write new user data to db
 * @param {Array.<number>} userData
 */
var updateDbUserData = function(userData) {
    userData.forEach(userDataItem => {
        var updateQuery = squel.update()
            .table('user_data')
            .set('class_type', userDataItem.grade)
            .where('id = ' + userDataItem.id)
            .toString();
        return await(sequelize.query(
            updateQuery,
            {
                type: sequelize.QueryTypes.UPDATE
            }
        ));
    });
};
