var async = require('asyncawait/async');
var await = require('asyncawait/await');
var colors = require('colors');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
const common = require.main.require('./console/common');

exports.name = 'egeResult';


/**
 * Add egeResult row
 * @param {number} school_id
 * @param {number} subject_id
 * @param {{
 *     year!: number,
 *     result!: number
 * }} data
 * @return {Object} instance of EgeResult model
 */
exports.add = async(function(school_id, subject_id, data) {
    data.school_id = school_id;
    data.subject_id = subject_id;
    return await(models.EgeResult.create(data));
});


/**
 * Uppdate egeResult data
 * @param {number} ege_id
 * @param {{
 *     school_id?: number,
 *     subject_id?: number,
 *     year?: number,
 *     result?: number
 * }} data
 * @return {Object} instance of EgeResult model
 */
exports.update = async(function(ege_id, data) {
    var instance = await(exports.getOneByData({id: ege_id}));
    return await(instance.update(data));
});


/**
 * Get all data from table
 * @return {Object} instances of EgeResult model
 */
exports.getAll = async(function() {
    return await(models.EgeResult.findAll());
});


/**
 * Get all data from table by data
 * @param {{
 *     id?: nimber,
 *     school_id?: number,
 *     subject_id?: number,
 *     year?: number,
 *     result?: number
 * }} data
 * @return {Object} instances of EgeResult model
 */
exports.getAllByData = async(function(data) {
    return await(models.EgeResult.findAll({
        where: data
    }));
});


/**
 * Get one data from table by data
 * @param {{
 *     id?: nimber,
 *     school_id?: number,
 *     subject_id?: number,
 *     year?: number,
 *     result?: number
 * }} data
 * @return {Object} instance of EgeResult model
 */
exports.getOneByData = async(function(data) {
    return await(models.EgeResult.findOne({
        where: data
    }));
});
