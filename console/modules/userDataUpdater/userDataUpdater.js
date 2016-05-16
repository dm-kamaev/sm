'use strict';

const await = require('asyncawait/await');
const path = require('path');
const csv2json = require('csvtojson').Converter;
const userDataService = require('../../../api/modules/user/services/userData');
const fs = require('fs');

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
        var file = this.openCsv_(pathToFile);
        var data = await(this.getDataFromCsv_(file));
        this.updateUserData_(data);
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
     * @param {string} file
     * @private
     */
    getDataFromCsv_(file) {
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
     * Updates user data with given data
     * @param {Array.<Object>} userDataItems
     * @private
     */
    updateUserData_(userDataItems) {
        userDataItems.forEach(dataItem => {
            this.writeUserDataItemToDb_(dataItem);
        });
    }


    /**
     * Write item with given params to db
     * @param {Object} item
     * @private
     */
    writeUserDataItemToDb_(item) {
        if(item.id) {
            await(userDataService.update(item.id, item));
        }
    }
}

module.exports = UserDataUpdater;
