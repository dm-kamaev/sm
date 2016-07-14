/**
 * @fileOverview Class, designed for operate with activities.
 * It take activity spheres, make it unique and calculate popularity
 * (amount of how much activity sphere with current name found in activities);
 * place unique activities to activities types table;
 * update activities by changing spheres to their id's;
 * then archive this tables.
 */

'use strict';

const path = require('path'),
    lodash = require('lodash'),
    await = require('asyncawait/await');

const services = require('../../../app/components/services').all;

const Archiver = require('../modelArchiver/Archiver'),
    CsvConverter = require('../modelArchiver/CsvConverter');

const ACTIVITY_ARCHIVE_NAME = 'activities.tar.gz',
    SPHERE_ARCHIVE_NAME = 'schperes.tar.gz'

class ActivitySphereOperator {

    /**
     * Create table with spheres from table with activities,
     * update reference to spheres from activities,
     * archive this tables
     */
    process() {
        var dbActivities = await(this.getDbActivities_()),
            uniqueSpheres = this.getUniqueSpheresFromActivities_(dbActivities),
            dbSpheres = await(this.createDbSpheres_(uniqueSpheres)),
            updatedActivities =
                await(this.updateActivities_(dbActivities, dbSpheres));

        this.archiveActivities_(updatedActivities);
        this.archiveSpheres_(dbSpheres);
    }

    /**
     * Return all activities instances in db
     * @return {Array<models.AdditionalEducation>}
     * @private
     */
    getDbActivities_() {
        return services.additionalEducation.getAll();
    }


    /**
     * Create array of unique spheres from given activities,
     * and calculate it popularity
     * @param {Array<models.AdditionalEducation>} activities
     * @return {{
     *     name: string,
     *     popularity: number
     * }}
     * @private
     */
    getUniqueSpheresFromActivities_(activities) {
        var spheres = activities.map(activity => activity.sphere),
            uniqueSpheresCollection = lodash.countBy(spheres);

        return lodash.map(
            uniqueSpheresCollection,
            (spherePopularity, sphereName) => {
                return {
                    name: sphereName,
                    popularity: spherePopularity
                };
            }
        );
    }


    /**
     * Fill spheres table with given spheres
     * @param {{
     *     name: string,
     *     popularity: number
     * }} spheres
     * @return {Array<models.AdditionaleducationSphere>}
     * @private
     */
    createDbSpheres_(spheres) {
        return spheres.map(sphere => {
            return await(services.additionalEducation.createSphere(sphere));
        });
    }


    /**
     * Updates given activities and set sphere_id instead sphere name
     * @param {Array<models.AdditionalEducation>} activities
     * @param {Array<models.AdditionalEducationSphere>} spheres
     * @return {Array<models.AdditionalEducation>}
     * @private
     */
    updateActivities_(activities, spheres) {
        return activities.map(activity => {
            var sphereName = activity.sphere,
                sphere = spheres.find(item => {
                    return item.name == sphereName;
                }),
                sphereId = sphere.id;
            return await(activity.update({
                sphereId: sphereId
            }));
        });
    }


    /**
     * Archive given array of activities for use in migration
     * @param {Array<models.AdditionalEducation>} activities
     * @private
     */
    archiveActivities_(activities) {
        var filePath = path.join(__dirname, ACTIVITY_ARCHIVE_NAME),
            formattedActivities = activities.map(activity => {
                return {
                    id: activity.id,
                    'sphere_id': activity.sphereId
                };
            }),
            csv = CsvConverter.createCsv(formattedActivities);

        Archiver.archive(csv, filePath);
    }

    /**
     * Archive given array of activity spheres for use in migration
     * @param {Array<models.AdditionalEducationSphere>} spheres
     * @private
     */
    archiveSpheres_(spheres) {
        var filePath = path.join(__dirname, SPHERE_ARCHIVE_NAME),
            date = new Date().toJSON(),
            formattedSpheres = spheres.map(sphere => {
                return {
                    name: sphere.name,
                    popularity: sphere.popularity,
                    'updated_at': date,
                    'created_at': date
                };
            }),
            csv = CsvConverter.createCsv(formattedSpheres);

        Archiver.archive(csv, filePath);
    }
}

module.exports = ActivitySphereOperator;
