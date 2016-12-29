'use strict';

// author: dm-kamaev
// work with table db 'courses_search_catalog'

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const models = require('../../../../app/components/models').all;

let service = {
    name: 'courseSearchCatalog'
};


/**
 * get all
 * @return {Object[]} all records
 */
service.getAll = async(function() {
    return await(models.CourseSearchCatalog.findAll());
});


/**
 * get by id
 * @param  {Number} linkId
 * @return {Object{}} one record
 */
service.getById = async(function(linkId) {
    return await(models.CourseSearchCatalog.findOne({
        where: {
            id: linkId
        }
    }));
});


/**
 * create
 * @param  {Object} data {
 *
 * }
 * @return {[type]}       [description]
 */
service.create = async(function(data) {
    return await(models.CourseSearchCatalog.create(data));
});


/**
 * update
 * @param  {Number} linkId id record
 * @param  {Object{}} data
 */
service.update = async(function(linkId, data) {
    return await(models.CourseSearchCatalog.update(data, {
        where: {
            id: linkId
        },
        returning: true
    }))[1][0];
});


/**
 * delete
 * @param  {Number} linkId record id
 */
service.delete = async(function(linkId) {
    return await(models.CourseSearchCatalog.destroy({
        where: {
            id: linkId
        }
    }));
});

module.exports = service;
