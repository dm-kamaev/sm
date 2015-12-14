var async = require('asyncawait/async');
var await = require('asyncawait/await');
var colors = require('colors');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
const common = require.main.require('./console/common');

exports.name = 'giaResult';

/**
 * Add giaResult row
 * @param {number} school_id
 * @param {number} subject_id
 * @param {{
 *     count!: number,
 *     result!: number
 * }} data
 * @return {Object} instance of GiaResult model
 */
exports.add = async(function(school_id, subject_id, data) {
    data.school_id = school_id;
    data.subject_id = subject_id;
    return await(models.GiaResult.create(data));
});


/**
 * Uppdate giaResult data
 * @param {number} gia_id
 * @param {{
 *     school_id?: number,
 *     subject_id?: number,
 *     count?: number,
 *     result?: number
 * }} data
 * @return {Object} instance of GiaResult model
 */
/**
 * Update rating data
 */
exports.update = async(function(gia_id, data) {
    var instance = await(exports.getOneByData({id: gia_id}));
    return await(instance.update(data));
});


/**
 * Get all data from table
 * @return {Object} instances of GiaResult model
 */
exports.getAll = async(function() {
    return await(models.GiaResult.findAll());
});


/**
 * Get all data from table by data
 * @param {{
 *     id?: nimber,
 *     school_id?: number,
 *     subject_id?: number,
 *     count?: number,
 *     result?: number
 * }} data
 * @return {Object} instances of GiaResult model
 */
exports.getAllByData = async(function(data) {
    return await(models.GiaResult.findAll({
        where: data
    }));
});


/**
 * Get one data from table by data
 * @param {{
 *     id?: nimber,
 *     school_id?: number,
 *     subject_id?: number,
 *     count?: number,
 *     result?: number
 * }} data
 * @return {Object} instance of GiaResult model
 */
exports.getOneByData = async(function(data) {
    return await(models.GiaResult.findOne({
        where: data
    }));
});
