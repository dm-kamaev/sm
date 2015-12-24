'use strict';
const await = require('asyncawait/await');
const CsvConverter = require('./CsvConverter.js');
const Archiver = require('./Archiver.js');
const path = require('path');
const sequelize = require('../../../app/components/db');
const fs = require('fs');

class ModelArchiver {
    /**
     * @public
     * @param {object} model - sequlelize model (not instance)
     * @param {string} folder 
     */
    constructor(model, folder) {
        this.initialLogiing_ = sequelize.options.logging;
        sequelize.options.logging = false;

        this.model_ = model;
        var archiveName = this.model_.name + '.tar.gz';
        var fullPath = path.join(folder, archiveName);
        this.archiver_ = new Archiver(fullPath);
    }

    
    /**
     * @public
     * @param {string} path
     */
    save(path) {
        var instances = await(this.model_.findAll());
        var converter = new CsvConverter(JSON.stringify(instances));
        var csv = await (converter.toCsv());
        await(this.archiver_.compress(csv, path));
        this.dispatch_();
    }
    
    /**
     * @public
     */
    load() {
        var csv = await(this.archiver_.decompress());
        var converter = new CsvConverter(csv);
        var data = converter.toJson();
        await(this.loadData_(data));
        this.dispatch_();
    }

    /**
     * @private
     * @param {array<object>} data
     */
    loadData_(data) {
        var chunks = [];
        var chunkSize = 100;
        await(this.model_.destroy({ where:{} }));
        for (var i = 0; i < data.length; i += chunkSize) 
            chunks.push(data.slice(i, i + chunkSize));
        await (chunks.forEach(chunk => {
            await(this.model_.bulkCreate(chunk));
        }));
        await (this.actualizeSequence_());
    }

    /**
     * @private
     * fixes bug in auto incremented id
     */
    actualizeSequence_() {
        var tableName = this.model_.tableName;
        var sqlString = 'SELECT setval(\'' + tableName + 
                '_id_seq\', (SELECT MAX(id) from ' +
                tableName +'));';
        try {
            await(sequelize.query(
                sqlString, 
                {type: sequelize.QueryTypes.SELECT}
            ));
        } catch (e) {
            throw e;
        }
    }

    /**
     * @privare
     */
    dispatch_() {
        sequelize.options.logging = this.initialLogiing_;
    }

}

module.exports = ModelArchiver;

