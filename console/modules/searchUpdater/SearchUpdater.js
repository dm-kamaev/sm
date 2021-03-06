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
const TextActualizer = require('./TextActualizer');
const CourseActualizer = require('./CourseActualizer');
const models = require('../../../app/components/models').all;
const entityType = require('../../../api/modules/entity/enums/entityType');

const services = require('../../../app/components/services').all;

const SCHOOL_FIELDS = ['name', 'fullName', 'abbreviation'],
    METRO_FIELDS = ['name'],
    AREA_FIELDS = ['name'],
    DISTRICT_FIELDS = ['name'],
    COURSE_FIELDS = ['name'];

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
        this.schoolTypeFilters_ = await(services.schoolSearch.getTypeFilters());
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
                addresses: services.address.getAllWithSearchData(),
                areas: services.area.getAll(),
                districts: services.district.getAll(),
                metros: services.metro.getAll(),
                courses: services.course.getAll()
            },
            data = await(dataPromises);
        await(
            this.updateSchools_(data.schools),
            this.updateCourses_(data.courses),
            this.updateAddresses_(data.addresses),
            this.updateTextData_(data)
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
            await(services.schoolSearch.setSchoolType(
                school.id,
                filterInstance.id
            ));

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
     * @param {Array<Object>} courses
     */
    updateCourses_(courses) {
        var bar = this.getProgressBar_('courses', courses.length),
            courseSearchData = await(services.courseSearchData.getAll());
        courses.forEach(course => {
            var courseActualizer = new CourseActualizer(
                course,
                courseSearchData
            );
            await(courseActualizer.actualize());
            bar.tick();
        });
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
     * @param {Object} data
     */
    updateTextData_(data) {
        var textActualizers = [
                new TextActualizer(
                    data.schools,
                    entityType.SCHOOL,
                    SCHOOL_FIELDS
                ),
                new TextActualizer(
                    data.metros,
                    entityType.METRO,
                    METRO_FIELDS
                ),
                new TextActualizer(
                    data.areas,
                    entityType.AREA,
                    AREA_FIELDS
                ),
                new TextActualizer(
                    data.districts,
                    entityType.DISTRICT,
                    DISTRICT_FIELDS
                ),
                new TextActualizer(
                    data.courses,
                    entityType.COURSE,
                    COURSE_FIELDS
                )
            ],
            bar = this.getProgressBar_('text data', textActualizers.length);

        textActualizers.forEach(textActualizer => {
            await(textActualizer.actualize());
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
