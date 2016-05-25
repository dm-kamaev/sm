'use strict';

const await = require('asyncawait/await');
const path = require('path');
const csv2json = require('csvtojson').Converter;
const sequelize = require('../../../app/components/db');
const fs = require('fs');
const squel = require('squel');

const Archiver = require('../modelArchiver/Archiver');

const FILE_PATH = './api/modules/user/migrations/user-data.tar.gz';

/**
 * Class, used for updating 'user_data' table in db.
 * It can take information for update from .csv (with ';' delimiter)
 * with no headers and two rows:
 * id and username
 * and place it to corresponding fields at 'user_data' table.
 * It write to db through user service, which updates user_data.
 */
class UserDataUpdater {
    constructor() {}



    /**
     * Get data from csv and update with given data user data fields
     * @param {string} pathToFile
     */
    updateFromCsv(pathToFile) {
        var data = await(this.getDataFromCsv_(pathToFile));
        this.updateDbUserData_(data);
    }


    /**
     * Create file which contains csv file with objects with
     * updated name newNamesFile and old name from oldNamesFile
     * Comparison occurs by id
     * @param {{
     *     oldNames: string,
     *     updatedNames: string
     * }} options
     */
    createCorrelatingCsv(options) {
        var oldNames = await(this.getDataFromCsv_(options.oldNames)),
            newNames = await(this.getDataFromCsv_(options.updatedNames));
        var correlatingNames = this.correlateNames_(oldNames, newNames);

        this.archive_(correlatingNames);
    }


    /**
     * Give user data objects from archive on path,
     * find by original names user_data items in db and update it with new names
     * @param {string} path
     * @public
     */
    updateFromArchive(path) {
        var userNames = this.extract_(path);
        await(this.updateDbUserData_(userNames));
    }


    /**
     * Opens file from given path
     * @param {string} pathToFile
     * @private
     */
    openCsv_(pathToFile) {
        var fullPath = path.join(__dirname, '../../../' + pathToFile);
        return fs.readFileSync(fullPath, 'utf-8');
    }


    /**
     * Get data from csv
     * @param {string} pathToFile
     * @private
     */
    getDataFromCsv_(pathToFile) {
        var file = this.openCsv_(pathToFile);

        return new Promise(function(resolve, reject) {
            var csvConverter = new csv2json({
                noheader: true,
                toArrayString: true,
                delimiter: [';'],
                headers: ['id', 'username']
            });
            csvConverter.fromString(file, function(error, result) {
                if(error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    }

    /**
     * Correllate names from old and new arrays by id
     * @param {Array<{
     *     id: number,
     *     username: string
     * }>} oldNames
     * @param {Array<{
     *     id: number,
     *     username: string
     * }>} newNames
     * @return {Array<{
     *     original: number,
     *     corrected: string
     * }>}
     * @private
     */
    correlateNames_(oldNames, newNames) {
        var names = newNames.map(nameObject => {
            var result = {},
                findedOldNameItem = this.findNameById_(oldNames, nameObject.id);

            if(findedOldNameItem) {
                result = {
                    original: findedOldNameItem.username,
                    corrected: nameObject.username
                };
            }

            return result;
        });

        return names;
    }

    /**
     * Find by id items in nmes array
     * @param {Array<{
     *     id: number,
     *     username: string
     * }>} names
     * @param {(number|string)} id
     * @return {{
     *     id: number,
     *     username: string
     * }}
     * @private
     */
    findNameById_(names, id) {
        return names.find(name => {
            return parseInt(name.id) == parseInt(id);
        });
    }


    /**
     * Updates user data with given data
     * @param {Array.<{
     *     original: number,
     *     corrected: string
     * }>} userDataItems
     * @private
     */
    updateDbUserData_(userDataItems) {
        userDataItems.forEach(dataItem => {
            var dbUserData = await(
                this.findUserDataByUserName_(dataItem.original)
            );
            if(dbUserData) {
                this.updateDbUserDataItem_(
                    dbUserData.id,
                    dataItem.corrected
                );
            }
        });
    }


    /**
     * Find by username user_data item
     * @param {string} username
     * @private
     */
    findUserDataByUserName_(username) {
        var query = squel.select()
            .from('user_data')
            .where('username = \'' + username + '\'')
            .toString();

        var dbUserData = await(sequelize.query(
            query,
            {type: sequelize.QueryTypes.SELECT}
        ));

        return dbUserData[0];
    }


    /**
     * Write new username to user_data with given id
     * @param {number} id
     * @param {string} username
     * @private
     */
    updateDbUserDataItem_(id, username) {
        var query = squel.update()
            .table('user_data')
            .where('id = ' + id)
            .set('username',  username)
            .toString();

        return await(sequelize.query(
            query,
            {type: sequelize.QueryTypes.UPDATE}
        ));
    }


    /**
     * Archive given comments into file
     * @param {(Array<{id: number, createdAt: Date}>)} comments
     * @private
     */
    archive_(comments) {
        var archiver = new Archiver(FILE_PATH);
        
        await(archiver.compress(JSON.stringify(comments)));
    }

    /**
     * Extract comments from given path
     * @param {string} path
     * @return Array<{
     *     original: number,
     *     corrected: string
     * }>
     * @private
     */
    extract_(path) {
        var archiver = new Archiver(path);

        return JSON.parse(archiver.decompress());
    }
}

module.exports = UserDataUpdater;
