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
        this.options = {
            attributes: {
                exclude: ['created_at', 'updated_at']
            }
        };
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
     * @param {Object} [opt_options] - loading options
     * @param {boolean} [opt_options.bulkInsert=false] - quick insert without update
     * @public
     */
    load(opt_options) {
        var csv = await(this.archiver_.decompress());

        var converter = new CsvConverter(csv);
        var data = converter.toJson();

        await(this.loadData_(data, opt_options));
        this.dispatch_();
    }


    /**
     * @private
     * @param {array<object>} data
     * @param {Object} [opt_options] - loading options
     * @param {boolean} [opt_options.bulkInsert=false] - quick insert without update
     */
    loadData_(data, opt_options) {
        var options = opt_options || {};

        data.forEach(item => {
            delete item.created_at;
            delete item.updated_at;
        });

        options.bulkInsert ?
            this.bulkInsertLoad_(data) :
            this.upsertLoad_(data);

        await (this.actualizeSequence_());
    }


    /**
     * Insert or update data
     * @param {array<object>} data
     * @private
     */
    upsertLoad_(data) {
        await(data.map(record => {
            return this.model_.upsert(record, {
                raw: true,
                validate: false,
                hooks: false,
                sideEffects: false,
                fields: Object.keys(record)
            });
        }));
    };


    /**
     * Inserting data only (faster then upsert, but without updating)
     * @param {array<object>} data
     * @private
     */
    bulkInsertLoad_(data) {
        var chunks = [];
        var chunkSize = 100;
        for (var i = 0; i < data.length; i += chunkSize) {
            chunks.push(data.slice(i, i + chunkSize));
        }
        await (chunks.forEach(chunk => {
            await(this.model_.bulkCreate(chunk));
        }));
    };


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
