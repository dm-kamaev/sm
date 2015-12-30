'use strict';
const await = require('asyncawait/await');
const CsvConverter = require('./CsvConverter.js');
const Archiver = require('./Archiver.js');
const path = require('path');
const sequelize = require('../../../app/components/db');

class ModelArchiver {
    
    /**
     * @public
     * @param {string} migrationPath
     * @return {string}
     */
    static migrationToArchive(migrationPath) {
        var filename = path.basename(migrationPath, '.js');
        return filename + '.tar.gz';
    }

    /**
     * @public
     * @param {object} model - sequlelize model (not instance)
     * @param {string} folder 
     * @param {?array<string>} opt_attributes
     * @param {?string} opt_fileName
     */
    constructor(model, folder, opt_attributes, opt_fileName) {
        this.options = {};
        if (opt_attributes)
            this.options.attributes = opt_attributes;
        this.initialLogiing_ = sequelize.options.logging;
        sequelize.options.logging = false;
        this.model_ = model;
        var archiveName = opt_fileName || this.model_.name + '.tar.gz';
        var fullPath = path.join(folder, archiveName);
        this.archiver_ = new Archiver(fullPath);
    }

    
    /**
     * @public
     * @param {string} path
     */
    save() {
        var instances = await(this.model_.findAll(this.options));
        var converter = new CsvConverter(JSON.stringify(instances));
        var csv = await (converter.toCsv());
        await(this.archiver_.compress(csv));
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
        await (data.forEach(record => {
            this.model_.upsert(record, {
                raw: true,
                validate: false,
                hooks: false,
                sideEffects: false,
                fields: Object.keys(record)
            });
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

