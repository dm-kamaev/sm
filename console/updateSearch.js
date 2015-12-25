'use strict'
const exec = require('child_process').exec;
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const commander = require('commander');
const colors = require('colors');
const readlineSync = require('readline-sync');
const fs = require('fs');
const common = require.main.require('./console/common');
const services = require.main.require('./app/components/services').all;
const ProgressBar = require('progress');
const models = require.main.require('./app/components/models').all;
const searchType = require.main.require('./api/modules/school/enums/searchType');
const schoolType = require.main.require('./api/modules/school/enums/schoolType');
var sequelize = require.main.require('./app/components/db');
    
var start = async(function() {
    //sequelize.options.logging = false;
    var schools = await(services.school.listInstances());
    var searchUpdater = await(new SearchUpdater(schools));
    searchUpdater.start();
});

class SearchUpdater {
    /**
     * @public 
     * @param {array<object>} schools 
     * @param {bool} [isRewriting = false]
     */
    constructor(schools) {
        this.schools_ = schools;
        this.citySubjects_ = await (services.subject.listCityResults());
        this.schoolTypeFilters_ = await (services.search.getTypeFilters());
    }

    /**
     * @public
     * @async
     */
    start() {
        var bar = new ProgressBar('Processing :bar :current/:total', { 
            total: this.schools_.length,
            width: 30 
        });
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

/**
 * abstract class
 */
class SearchDataActualizer {
    constructor(school) {
        this.school_ = school;
        this.currentSearcData_ = await(
            services.search.getSchoolRecords(this.school_.id)
        );
    }

    /**
     * @public
     * actualize olymp search data for school
     */
    actualize() {
        this.getData_();
        await(this.getResults_());
        this.getSubjects_();
        if (this.resultSubjects_.length)
            await(this.updateDb_());
    }

    /**
     * @private
     * get current gia search data for school
     */
    getData_() {
        this.typeData_ = this.currentSearcData_.find(
            rec => rec.type == this.searchType_
        ); 
    }

    /**
     * @private
     */
    updateDb_() {
        if (this.typeData_) {
            await(this.typeData_.update({
                values: this.resultSubjects_
            }));
        } else {
            await (services.search.addSearchData(
                this.school_.id,
                this.resultSubjects_,
                this.searchType_)
            );
        }
    }
}

/**
 * Used to actualize ege search data for one school
 */
class EgeActualizer extends SearchDataActualizer {
    /**
     * @public
     * @param {object} school
     * @param {array<object>} citySubjects - subject instances with avg results for Moscow
     */
    constructor(school, citySubjects) {
        await(super(school)); //call parent constructor
        this.citySubjects_ = citySubjects;
        this.resultSubjects_ = [];
        this.searchType_ = searchType.EGE;
    }


    /**
     * @private
     * Try to get 'good' subjects for 2015 year, 
     * then if there are no 2015 results for subject
     * try to use 2014 results, etc
     */
    getSubjects_() {
        var yearsResults = [],
            processedSubjects = [];
        //TODO: move years in constants
        for (var year = 2015; year >= 2012; year--) {
            var yearResults = this.getYearResults_(year);
            yearsResults.push(
                await(this.getYearSubjects_(yearResults))
            );
        }

        yearsResults.forEach(subjectArr => {
            subjectArr.forEach(subjectRec => {
                var index = processedSubjects.indexOf(subjectRec.id),
                    isProcessed = index == -1 ? false : true;
                if (!isProcessed) {
                    if (subjectRec.isPassed)
                        this.resultSubjects_.push(subjectRec.id);
                    processedSubjects.push(subjectRec.id);
                }
            });
        }); 
    }

    /**
     * @private
     * @param {array<object>} yearResults
     * @return {array<id, isPassed>} yearSubjects
     * get array of subjects IDs where school ege result > city avg result for year
     */
    getYearSubjects_(yearResults) {
        //TODO: refactor or comment this
        var yearSubjects = [];
        await (yearResults.forEach(egeResult => { 
            var citySubject = this.citySubjects_.find(
                subj => subj.id == egeResult.subject_id);
            if (citySubject) {
                var cityResult = citySubject.cityResult.find(
                    res => (res.cityId == this.school_.city_id));
                if (cityResult) {
                    var isPassed;
                    if (egeResult.result >= cityResult.egeResult)
                        isPassed = true;
                    else
                        isPassed = false;
                    yearSubjects.push({
                        id: egeResult.subject_id,
                        isPassed: isPassed
                    });
                } 
            }
        }));
        return yearSubjects;
    }

    /**
     * @private
     * get ege results for school
     */
    getResults_() {
        this.egeResults_ = await (this.school_.getEgeResults()); 
    }

    /**
     * @private
     * @param {number} year
     * @return {array<object>}
     * get year ege results for school
     */
    getYearResults_(year) {
        return this.egeResults_.filter(res => res.year == year);
    }
}

/**
 * Used to actualize gia search data for one school
 */
class GiaActualizer extends SearchDataActualizer {
    /**
     * @public
     * @param {object} school
     * @param {array<object>} citySubjects - subject instances with avg results for Moscow
     */
    constructor(school, citySubjects) {
        await(super(school, citySubjects)); //call parent constructor
        this.citySubjects_ = citySubjects;
        this.resultSubjects_ = [];
        this.searchType_ = searchType.GIA;
    }


    /**
     * @private
     * get array of subjects IDs where school gia result > city avg result
     * it works, I promise
     */
    getSubjects_() {
        //TODO: refactor or comment this
        await (this.giaResults_.forEach(giaResult => { 
            var citySubject = this.citySubjects_.find(
                subj => subj.id == giaResult.subject_id);
            if (citySubject) {
                var cityResult = citySubject.cityResult.find(
                    res => (res.cityId == this.school_.city_id));
                if (cityResult && giaResult.result >= cityResult.giaResult)
                    this.resultSubjects_.push(giaResult.subject_id);
            }
        }));
    }

    /**
     * @private
     * get gia results for school
     */
    getResults_() {
        this.giaResults_ = await (this.school_.getGiaResults()); 
    }
}

/**
 * Used to actualize olymp search data for one school
 */
class OlympActualizer extends SearchDataActualizer {
    /**
     * @public
     * @param {object} school
     */
    constructor(school) {
        await(super(school)); //call parent constructor
        this.resultSubjects_ = [];
        this.searchType_ = searchType.OLIMPIAD;
    }

    /**
     * @private
     * get array of subjects IDs for school olymp results
     */
    getSubjects_() {
        this.olympResults_.forEach(olympRes => {
            if (!this.resultSubjects_.find(
                    subject => subject == olympRes.subjectId))
                this.resultSubjects_.push(olympRes.subjectId);
        });
    }

    /**
     * @private
     * get olymp results for school
     */
    getResults_() {
        //TODO: to fix 'Olimp' typo model name must be fixed as well
        this.olympResults_ = await (this.school_.getOlimpResults()); 
    }
}






commander
    .command('search')
    .description('Update search index')
    .action(() => start());

exports.Command;

