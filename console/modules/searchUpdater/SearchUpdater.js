'use strict';
const await = require('asyncawait/await');
const schoolType = require('../../../api/modules/school/enums/schoolType');
const path = require('path');
const apiModulesPath = path.join(__dirname, '../../../api/modules');
const ProgressBar = require('progress');
const EgeActualizer = require('./EgeActualizer');
const GiaActualizer = require('./GiaActualizer');
const OlympActualizer = require('./OlympActualizer');
const models = require('../../../app/components/models').all;
const services = require('../../../app/components/services').all;

class SearchUpdater {
    /**
     * @public 
     * @param {?object} opt_options 
     * @param {?bool} opt_options.isQuiet
     */
    constructor(opt_options) {
        this.citySubjects_ = await (services.subject.listCityResults());
        this.schoolTypeFilters_ = await (services.search.getTypeFilters());
        this.options_ = opt_options || {};
    }

    /**
     * @public 
     * @param {object} school - School instance
     */ 
    updateForSchool(school) {
        this.schools_ = [];
        this.schools_.push(school);
        await(this.update_());
    }

    /**
     * @public 
     * @param {array<object>} schools - School instances
     */ 
    updateForSchools(schools) {
        this.schools_ = schools;
        await(this.update_());
    }

    /**
     * @public 
     */ 
    updateForAll() {
        this.schools_ = await(services.school.listInstances());
        await(this.update_());
    }

    /**
     * @private
     * @async
     */
    update_() {

        if (!this.schools_)
            throw new Error('Schools not set');
        var bar = {
            tick: function(){}
        };
        if (!this.options_.isQuiet) {
            bar = new ProgressBar('Processing :bar :current/:total', { 
                total: this.schools_.length,
                width: 30 
            });
        }
        await (this.updateAverage_());
        await (this.schools_.forEach(school => {
            /*update type filters*/
            var filterInstance = this.getTypeFilter_(school.schoolType);
            await(services.search.setSchoolType(school.id, filterInstance.id));
            
            /*update ege filters*/
            var egeActualizer = await(new EgeActualizer(school, this.citySubjects_));
            await(egeActualizer.actualize());
                
            /*update gia filters*/
            var giaActualizer = await (new GiaActualizer(school, this.citySubjects_));
            await (giaActualizer.actualize());

            /*update olymp filters*/
            var olympActualizer = await (new OlympActualizer(school));
            await(olympActualizer.actualize());
            bar.tick();
        }));
        console.log('Succses. Stopping script');
    }
    /**
     * @private
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
     * @private 
     * @async
     */
    updateAverage_() {
        var msc = await(services.city.getMoscow());
        await (
            this.updateGiaAvg_(msc.id),
            this.updateEgeAvg_(msc.id)
       ); 
    }
    
    /**
     * @param {string} type School type 
     * @returns {object} SchoolTypeFilter instance
     */
    getTypeFilter_(type) {
        var typeName = schoolType.getPropByValue(type);
        if (!typeName)
            throw new Error ('Cant find type \"'+ type + '\" in enum');
        var instance = this.schoolTypeFilters_.find(schoolTypeFilter => {
            var index = schoolTypeFilter.values.indexOf(typeName);
            return index == -1 ? false : true;
        });
        if (!instance)
            throw new Error ('Cant find school_type_filter for school type: ' + typeName);
        return instance;
    }
}

module.exports = SearchUpdater;


