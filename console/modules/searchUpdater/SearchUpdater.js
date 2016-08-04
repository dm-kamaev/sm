'use strict';
const await = require('asyncawait/await');
const schoolType = require('../../../api/modules/school/enums/schoolType');
const ProgressBar = require('progress');
const EgeActualizer = require('./EgeActualizer');
const GiaActualizer = require('./GiaActualizer');
const OlympActualizer = require('./OlympActualizer');
const SpecializedClassTypeActualizer =
    require('./SpecializedClassTypeActualizer');
const SchoolActivitySphereActualizer =
    require('./SchoolActivitySphereActualizer');
const AddressActualizer = require('./AddressActualizer');
const models = require('../../../app/components/models').all;

const services = require('../../../app/components/services').all;

class SearchUpdater {
    /**
     * @public
     * @param {Object=} opt_options
     * @param {bool=} opt_options.isQuiet
     */
    constructor(opt_options) {
        /**
         * @type {*|exports}
         * @private
         */
        this.citySubjects_ = null;

        /**
         * @type {Array<models.SchoolTypeFilter>}
         * @private
         */
        this.schoolTypeFilters_ = null;

        /**
         * Current options
         * @type {{
         *     isQuiet: boolean
         * }}
         * @private
         */
        this.options_ = opt_options || {};
    }


    /**
     * Init fields
     */
    init() {
        this.citySubjects_ = await(services.subject.listCityResults());
        this.schoolTypeFilters_ = await(services.search.getTypeFilters());
    }

    /**
     * @public
     * @param {Object} school - School instance
     */
    updateForSchool(school) {
        await(this.updateSchools_([school]));
    }

    /**
     * @public
     * @param {Array<Object>} schools - School instances
     */
    updateForSchools(schools) {
        await(this.updateSchools_(schools));
    }

    /**
     * @public
     */
    updateForAll() {
        var dataPromises = {
                schools: services.school.listInstances(),
                addresses: services.address.getAllWithSearchData()
            },
            data = await(dataPromises);

        await(
            this.updateSchools_(data.schools),
            this.updateAddresses_(data.addresses)
        );
        console.log('Succses. Stopping script');
    }

    /**
     * @private
     * @async
     * @param {Array<Object>} schools
     */
    updateSchools_(schools) {
        if (!schools) {
            throw new Error('Schools not set');
        }
        var bar = this.getProgressBar_('schools', schools.length);
        await(this.updateAverage_());

        await(this.init());

        await(schools.forEach(school => {
            /* update type filters */
            var filterInstance = this.getTypeFilter_(school.schoolType);
            await(services.search.setSchoolType(school.id, filterInstance.id));

            /* update ege filters */
            var egeActualizer =
                await(new EgeActualizer(school, this.citySubjects_));
            await(egeActualizer.actualize());

            /* update gia filters */
            var giaActualizer =
                await(new GiaActualizer(school, this.citySubjects_));
            await(giaActualizer.actualize());

            /* update olymp filters */
            var olympActualizer = await(new OlympActualizer(school));
            await(olympActualizer.actualize());


            /* update specialized class types filters */
            var specializedClassesActualizer =
                new SpecializedClassTypeActualizer(school);
            await(specializedClassesActualizer.actualize());


            /* update activity spheres */
            var schoolActivitySphereActualizer =
                new SchoolActivitySphereActualizer(school);
            await(schoolActivitySphereActualizer.actualize());

            bar.tick();
        }));
    }

    /**
     * @private
     * @param {Array<Object>} addresses
     */
    updateAddresses_(addresses) {
        var bar = this.getProgressBar_('addresses', addresses.length);
        addresses.forEach(address => {
            var addressActualizer = new AddressActualizer(address);
            await(addressActualizer.actualize());
            bar.tick();
        });
    }

    /**
     * @private
     * @param {number} cityId
     */
    updateGiaAvg_(cityId) {
        var giaAvg = await(services.studyResult.getGiaAverage(cityId));
        await(models.CityResult.destroy({
            where: {
                type: 'gia'
            }
        }));
        await(models.CityResult.bulkCreate(giaAvg));
    }

    /**
     * @private
     * @param {number} cityId
     */
    updateEgeAvg_(cityId) {
        var egeAvg = await(services.studyResult.getEgeAverage(cityId));
        await(models.CityResult.destroy({
            where: {
                type: 'ege'
            }
        }));
        await(models.CityResult.bulkCreate(egeAvg));
    }



    /**
     * @return {Promise}
     * @private
     * @async
     */
    updateAverage_() {
        var msc = await(services.city.getMoscow());
        return await(
            this.updateGiaAvg_(msc.id),
            this.updateEgeAvg_(msc.id)
       );
    }

    /**
     * @private
     * @param {string} type School type
     * @returns {Object} SchoolTypeFilter instance
     */
    getTypeFilter_(type) {
        var typeName = schoolType.getPropByValue(type);
        if (!typeName) {
            throw new Error('Cant find type "' + type + '" in enum');
        }
        var instance = this.schoolTypeFilters_.find(schoolTypeFilter => {
            var index = schoolTypeFilter.values.indexOf(typeName);
            return index != -1;
        });
        if (!instance) {
            throw new Error('Cant find school_type_filter for school type: ' +
                typeName);
        }
        return instance;
    }

    /**
     * @private
     * @param {string} name
     * @param {number} totalLength
     * @return {Object}
     */
    getProgressBar_(name, totalLength) {
        var bar = {
            tick: function() {}
        };
        if (!this.options_.isQuiet) {
            bar = new ProgressBar(
                'Processing ' + name + ' :bar :current/:total', {
                    total: totalLength,
                    width: 30
                }
            );
        }
        return bar;
    }
}

module.exports = SearchUpdater;
