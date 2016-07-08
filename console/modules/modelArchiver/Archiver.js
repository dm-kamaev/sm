'use strict';
const fs = require('fs-extra');
const targz = require('tar.gz');
const Decompress = require('decompress');
const await = require('asyncawait/await');
const common = require('../../common');
const path = require('path');
const sequelize = require('../../../app/components/db');
const lodash = require('lodash');


/**
 * This class can be used standalone from ModelArchiver.
 * Can be userfull with migrations based on straight csv uploading to postgres.
 *
 * To achieve this goal you need to:
 *     1) initiate an object of Archiver with path to your archived .csv file;
 *     2) run archiver.fillTable(%table_name%, %delimiter%);
 * You can see an example at
 * api/modules/entity/migrations/20160603133300-page-data.js
 *
 * Also it can update table with .csv
 * To achieve this goal you need to:
 *     1) initiate an object of Archiver with path to your archived .csv file;
 *     2) run archiver.updateTable(%table_name%, %delimiter%, %fieldsToMatch%);
 * Please note, that headers archived csv must contain [%fieldsToMatch%,]
 * and each [%fieldsToMatch%] item must be non-nullable fields due to postgress
 * compare values features.
 */

const TMP_TABLE_PREFIX = 'tmp_';

class Archiver {

    /**
     * @public
     * @param {string} relativePath
     */
    constructor(fullPath) {
        this.path_ = fullPath;
        this.archiveFolder_ = './.archive/';
        this.tmpName_ = 'archive.tmp';
    }

    get tmpName() {
        return this.tmpName_;
    }

    /**
     * @public
     * @param {string=} opt_outputFilePath
     * @return {string}
     */
    decompress(opt_outputFilePath) {
        if (!common.fileExists(this.path_))
            throw new Error('Can\'t find archive ' + this.path_);

        var archiveFolder = opt_outputFilePath || this.archiveFolder_;

        try {
            fs.emptyDirSync(this.archiveFolder_);
            await(this.decompressPromise_(opt_outputFilePath));
            var res = common.readText(path.join(archiveFolder, this.tmpName_));
            return res;
        } catch(e) {
            console.log(e.message);
        } finally {
            this.cleanFolder_();
        }
    }

    /**
     * @public
     * @param {string} text
     * @param {string} path
     */
    compress(text) {
        try
        {
            this.prepareArchive_(text);
            await(this.compressPromise_());
        } catch(e) {
            console.log(e.message);
        } finally {
            this.cleanFolder_();
        }
    }

    /**
     * @public
     * @param {string} directory
     */
    deleteUnarchivedFile(directory) {
        try {
            fs.removeSync(path.join(directory, this.tmpName_));
        } catch (e) {}
    }

    /**
     * Replace data in table with data from archive
     * @public
     * @param {string} table
     * @param {string} delimiter
     */
    fillTable(table, delimiter) {
        var fileLocation = path.parse(this.path_),
            fileDir = fileLocation.dir,
            filePath = path.join(fileDir, this.tmpName_);

        this.decompress(fileDir);

        this.copyToTable_(table, filePath, delimiter);

        this.deleteUnarchivedFile(fileDir);
    }


    /**
     * Update table with given name with csv from archive
     * Note, that fieldsToMatch cannot be nullable due to postgres compare
     * values features (NULL = NULL is false)
     * @param {string} table
     * @param {string} delimiter
     * @param {Array<string>} fieldsToMatch
     * @public
     */
    updateTable(table, delimiter, fieldsToMatch) {
        var fileLocation = path.parse(this.path_),
            fileDir = fileLocation.dir,
            filePath = path.join(fileDir, this.tmpName_);
        this.decompress(fileDir);
        var headers = this.getHeaders_(filePath);

        this.cloneToTempTable_(table, headers);

        var tmpTable = TMP_TABLE_PREFIX + table;
        this.copyToTable_(tmpTable, filePath, delimiter);
        //remove temporary file
        this.deleteUnarchivedFile(fileDir);

        var dbFieldsToMatch = fieldsToMatch.map(this.formatHeader_),
            dbFieldsToUpdate = headers.filter((fieldName) => {
                return dbFieldsToMatch.indexOf(fieldName) == -1;
            });

        this.updateTableFromTmpTable_(
            table,
            dbFieldsToMatch,
            dbFieldsToUpdate
        );

        //remove temporary table
        this.destroyTmpTable_(table);
    }


    /**
     * Creates temp table by copy fields from given table
     * @param {string} tableName
     * @param {Array<string>} fields
     * @private
     */
    cloneToTempTable_(tableName, fields) {
        var queryFields = fields.toString(),
            tmpTableName = TMP_TABLE_PREFIX + tableName,
            cloneQuery =
                'CREATE TEMP TABLE ' + tmpTableName +
                ' AS SELECT ' + queryFields + ' FROM ' + tableName + ' LIMIT 0';

        await(sequelize.query(
            cloneQuery,
            {
                type: sequelize.QueryTypes.CREATE
            }
        ));
    }

    /**
     * Destroy temp table with given name
     * @param {string} tableName
     * @private
     */
    destroyTmpTable_(tableName) {
        var tmpTableName = TMP_TABLE_PREFIX + tableName,
            dropQuery = 'DROP TABLE ' + tmpTableName;

        await(sequelize.query(
            dropQuery,
            {
                type: sequelize.QueryTypes.DROP
            }
        ));
    }


    /**
     * Update given table with values from given tmpTable,
     * compared by fieldsToMatch
     * @param {string} table
     * @param {Array<string>} fieldsToMatch
     * @param {Array<string>} fieldsToUpdate
     * @private
     */
    updateTableFromTmpTable_(table, fieldsToMatch, fieldsToUpdate) {
        var tmpTable = TMP_TABLE_PREFIX + table,
            expressions = this.generateExpressions_(tmpTable, fieldsToUpdate),
            conditions = this.generateConditions_(
                table, tmpTable, fieldsToMatch
            ),
            updateQuery = 'UPDATE ' + table +
                ' SET ' + expressions +
                ' FROM ' + tmpTable +
                ' WHERE ' + conditions;

        await(sequelize.query(
            updateQuery,
            {
                type: sequelize.QueryTypes.UPDATE
            }
        ));
    }

    /**
     * Generate expressions for update sql query
     * @param {string} sourceTableName
     * @param {Array<string>} fields
     * @return {string}
     * @private
     */
    generateExpressions_(sourceTableName, fields) {
        var targetFields = '(',
            sourceFields = '(',
            fieldsAmount = fields.length;


        fields.forEach((field, index) => {
            targetFields += field;
            sourceFields += sourceTableName + '.' + field;

            if (index != fieldsAmount - 1) {
                targetFields += ', ';
                sourceFields += ', ';
            } else {
                targetFields += ')';
                sourceFields += ')';
            }
        });

        return targetFields + ' = ' + sourceFields;
    }

    /**
     * Generate conditions for update sql query
     * @param {string} targetTableName
     * @param {string} sourceTableName
     * @param {Array<string>} fields
     * @return {string}
     * @private
     */
    generateConditions_(targetTableName, sourceTableName, fields) {
        return fields.reduce(
            (previousValue, currentValue, index, array) => {
                var length = array.length;
                var result = previousValue.concat(
                    targetTableName + '.' + currentValue +
                    ' = ' +
                    sourceTableName + '.' + currentValue);

                if (index !== length - 1) {
                    result += ' AND ';
                }

                return result;
            },
            '');
    }


    /**
     * Copy data from given csv on tmpFilePath to table with given name
     * @param {string} table
     * @param {string} tmpFilePath
     * @param {string} delimiter
     * @private
     */
    copyToTable_(table, tmpFilePath, delimiter) {
        var sqlQuery = 'COPY ' + table + '(' + this.getHeaders_(tmpFilePath) +
            ') FROM \'' + tmpFilePath + '\' WITH CSV HEADER DELIMITER \'' +
            delimiter + '\';';
        await(sequelize.query(sqlQuery));
    }


    /**
     * @private
     * @param {string} filePath
     * @return {Array<string>}
     */
    getHeaders_(filePath) {
        var file = fs.readFileSync(filePath, {encoding: 'utf8'}),
            headers = file.slice(0, file.indexOf('\n'));

        return headers.split('|').map(header => this.formatHeader_(header));
    }

    /**
     * @private
     * @param {string} header
     * @return {string}
     */
    formatHeader_(header) {
        return lodash.snakeCase(header.replace(/("")/g, ''));
    }

    /**
     * @private
     * @param {string=} opt_outputFilePath
     * @return {promise}
     */
    decompressPromise_(opt_outputFilePath) {
        // var path = this.path_;
        // return new Promise(function(resolve, reject) {
        //     targz().extract(path, './',function(err) {
        //         if(err)
        //             reject(err);
        //         //bug in tar.gz extract(). Callback called to early
        //         setTimeout(function() {resolve('succsess');}, 1000);
        //     });
        // });
        var filePath = this.path_;
        var archiveFolder = opt_outputFilePath || this.archiveFolder_;
        return new Promise(function(resolve, reject) {
            new Decompress()
                .src(filePath)
                .dest(archiveFolder)
                .use(Decompress.targz({strip: 1}))
                .run(function(err) {
                    if (err)
                        reject(err);
                    resolve('succsess');
                });
        });
    }

    /**
     * @private
     * @return {promise}
     */
    compressPromise_() {
        var filePath = this.path_;
        var archiveFolder = this.archiveFolder_;
        return new Promise(function(resolve, reject) {
            targz().compress(archiveFolder, filePath, function(err) {
                if (err)
                    reject(err);
                resolve('success');
            });
        });
    }

    /**
     * @private
     * @param {string} text
     */
    prepareArchive_(text) {
        fs.emptyDirSync(this.archiveFolder_);
        fs.writeFileSync(this.archiveFolder_ + this.tmpName_, text);
    }

    /**
     * @private
     */
    cleanFolder_() {
        try {
            fs.removeSync(this.archiveFolder_);
        } catch (e) {} // error if there is no dir
    }
}

module.exports = Archiver;
