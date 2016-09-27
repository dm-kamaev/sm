'use strict';

const async = require('asyncawait/async');
const await = require('asyncawait/await');

const sequelize = require('../../app/components/db');
var squel = require('squel');

module.exports = {
    up: async(function() {
        return updateRecords();
    }),
    down: function() {
        return null;
    }
};


/**
 * Updata all records
 * @return {Promise}
 */
var updateRecords = function() {
    var allRecords = await(getSeoTitle());

    return allRecords.map(record => {
        return updateSeoTitle(
            record.id,
            removeExtraSpaces(record.seo_title)
        );
    });
};

/**
 * Get all seo title in db
 * @return {Array<{
 *     id: number,
 *     seo_title: string
 * }>}
 */
var getSeoTitle = async(function() {
    var sqlQuery = squel.select()
        .from('seo_school_list')
        .field('id')
        .field('seo_title')
        .toString();

    return await(sequelize.query(
        sqlQuery,
        {
            type: sequelize.QueryTypes.SELECT
        }
    ));
});


/**
 * Remove extra spaces in seo title
 * @param {string} text
 * @return {string}
 */
var removeExtraSpaces = function(text) {
    return text.replace(/ \./g, '.');
};


/**
 * Update seo title
 * @param {number} id
 * @param {string} seoTitle
 * @return {Promise}
 */
var updateSeoTitle = function(id, seoTitle) {
    var sqlQuery = squel.update()
        .table('seo_school_list')
        .where('id = ' + id)
        .set('seo_title', seoTitle)
        .toString();

    return await(sequelize.query(
        sqlQuery,
        {
            type: sequelize.QueryTypes.UPDATE
        }
    ));
};
