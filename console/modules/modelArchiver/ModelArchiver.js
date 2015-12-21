'use strict';
const await = require('asyncawait/await');
const CsvConverter = require('./CsvConverter.js');
const Archiver = require('./Archiver.js');
const path = require('path');

class ModelArchiver {
    /**
     * @public
     * @param {object} model - sequlelize model (not instance)
     * @param {string} folder 
     */
    constructor(model, folder) {
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
    }
    
    /**
     * @public
     */
    load() {
        var csv = await(this.archiver_.decompress());
        var converter = new CsvConverter(csv);
        var data = converter.toJson();
        await(this.loadData(data));
    }

    /**
     * @private
     * @param {array<object>} data
     */
    loadData(data) {
        await(this.model_.destroy({ where:{} }));
        await(this.model_.bulkCreate(data));
    }
}

module.exports = ModelArchiver;

