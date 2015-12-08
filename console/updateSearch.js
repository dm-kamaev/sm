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
const searchType = require.main.require('./api/modules/school/enums/searchType');
const schoolType = require.main.require('./api/modules/school/enums/schoolType');
var sequelize = require.main.require('./app/components/db');
    
var start = function() {
  sequelize.options.logging = false;
    var vars = [
        'Start with updating old indexes', 
        'Start without updating old indexes'];
    var index = readlineSync.keyInSelect(vars, 'What to do?');
    switch (index) {
        case 0: 
            launch(true);
            break;
        case 1:
            launch();
            break;
    }
};

var launch = async (function(isRewriting) {
    var schools = await(services.school.list());
    await(new SearchUpdater(schools, isRewriting));
});

var SearchUpdater = async(function(schools, isRewriting){
    this.isRewriting = isRewriting || false;
    this.schools = schools;   
    this.citySubjects = await (services.subject.listCityResults());
    this.schoolTypeFilters = await (services.search.getTypeFilters());

    /**
     * @param {string} type School type 
     * @returns {object} SchoolTypeFilter instance
     */
    this.getTypeFilter = function(type) {
        var typeName = schoolType.getPropByValue(type);
        if (!typeName)
            throw new Error ('Cant find type \"'+ type + '\" in enum');
        var instance = this.schoolTypeFilters.find(schoolTypeFilter => {
            var index = schoolTypeFilter.values.indexOf(typeName);
            return index == -1 ? false : true;
        }

        );
        if (!instance)
            throw new Error ('Cant find school_type_filter for school type: ' + typeName);
        return instance;
    };

    var bar = new ProgressBar('Processing :bar :current/:total', { 
        total: schools.length,
        width: 30 
    });
    await (this.schools.forEach(school => {
        /*update type filters*/
        var filterInstance = this.getTypeFilter(school.schoolType);
        await(services.search.setSchoolType(school.id, filterInstance.id));

        /*update gia filters*/
        var gs = await (new GiaSchool(
            school,
            this.citySubjects,
            this.isRewriting));
        await (gs.process());

        /*update olimp filters*/
        var os = await (new OlimpSchool(
            school,
            this.isRewriting));
        await(os.process());
        bar.tick();
    }));
    console.log('Succses. Stopping script');
});


function OlimpSchool(school, isRewriting){
    this.school = school;
    this.isRewriting = isRewriting;
    this.olimpResults = await (this.school.getOlimpResults());
    this.dbOlimpRecord =
            await(services.search.getSchoolRecords(this.school.id))
                .find(rec => rec.type == searchType.OLIMPIAD); 
    this.resultSubjects = [];
    this.process = async(function() {
        if (!this.dbGiaRecord || this.isRewriting){
            await(this.getResults_());
            if (this.resultSubjects.length)
                await(this.updateDb_());
        }
    });

    /**
     * @private
     */
    this.getResults_ = async(function() {
        this.olimpResults.forEach(olimpRes => {
            if (!this.resultSubjects.find(
                    subject => subject == olimpRes.subjectId))
                this.resultSubjects.push(olimpRes.subjectId);
        });
    });

    /**
     * @private
     */
    this.updateDb_ = async(function() {
        if (this.isRewriting && this.dbOlimpRecord) {
            await(this.dbOlimpRecord.update({
                values: this.resultSubjects
            }));
        } else {
            await (services.search.addOlimp(
                this.school.id,
                this.resultSubjects));
        }
    });
} 

function GiaSchool(school, citySubjects, isRewriting){
    this.school = school;
    this.isRewriting = isRewriting;
    this.giaResults = await (this.school.getGiaResults());
    this.citySubjects = citySubjects;
    this.dbGiaRecord =
            await(services.search.getSchoolRecords(this.school.id))
                .find(rec => rec.type == searchType.GIA);
    this.resultSubjects = [];
    this.process = async(function() {
        if (!this.dbGiaRecord || this.isRewriting){
            await(this.getResults_());
            if (this.resultSubjects.length)
                await(this.updateDb_());
        }
    });

    /**
     * @private
     */
    this.getResults_ = async(function() {
        await (this.giaResults.forEach(giaResult => {
            var citySubject = this.citySubjects.find(
                subj => subj.id == giaResult.subject_id);
            if (citySubject) {
                var cityResult = citySubject.cityResult.find(
                    res => (res.cityId == school.city_id));
                if (cityResult && giaResult.result >= cityResult.giaResult)
                    this.resultSubjects.push(giaResult.subject_id);
            }
        }));
    });
    
    /**
     * @private
     */
    this.updateDb_ = async(function() {
        if (this.isRewriting && this.dbGiaRecord) {
            await(this.dbGiaRecord.update({
                values: this.resultSubjects
            }));
        } else {
            await (services.search.addGia(
                this.school.id,
                this.resultSubjects));
        }
    });
};




commander
    .command('search')
    .description('Update search index')
    .action(() => start());

exports.Command;

