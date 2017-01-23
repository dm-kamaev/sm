'use strict';
const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    commander = require('commander'),
    Converter = require('csvtojson').Converter;

const services = require.main.require('./app/components/services').all;

class SchoolSeoDescription {
    /**
     * @param  {string}  file
     * @return {Promise}
     */
    getFromFile(file) {
        return new Promise(function(resolve, reject) {
            var converter = new Converter({});
            converter.fromFile(file, function(err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    /**
     * @param {number} schoolId
     * @param {string} seoDescription
     */
    update(schoolId, seoDescription) {
        services.school.update(schoolId, {
            seoDescription: seoDescription
        });
    }
}

var getSeoDescriptions = async(function(file) {
    var schoolSeoDescription = new SchoolSeoDescription();

    var seoDescriptions = await(schoolSeoDescription.getFromFile(file));

    seoDescriptions.forEach(seoDescription => {
        schoolSeoDescription.update(
            seoDescription.id,
            seoDescription.seoDescription);
    });
});

/**
 * Settings for accessing this script using cli
 */
commander
    .command('seoDescriptions')
        .description('Updates seo descriptions from a given file')
        .action((file) => getSeoDescriptions(file));

exports.Command;
