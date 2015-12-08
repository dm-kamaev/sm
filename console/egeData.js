'use strict'
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var commander = require('commander');
var xlsx = require('node-xlsx');
var colors = require('colors');
var common = require.main.require('./console/common');

var ProgressBar = require('progress');
var sequelize = require.main.require('./app/components/db');

var modules = require.main.require('./api/modules');
var services = require.main.require('./app/components/services').all;

const LIST_INDEX = 1;
const FIRST_ROW = 5;
const LAST_ROW = 626;
const FIRST_COL = 4;
const SUBJECT_COUNT = 15;
const YEAR_COUNT = 7;
const YEAR_ROW = 3;
const SUBJECT_ROW = 4;
const SITE_INDEX = 1;
const BASE_MATH_COLUMN_INDEX = 1; //base math results should be converted
const BASE_MATH_YEAR = 2015;


var parse = async (function(path) {
    sequelize.options.logging = false;
    var progressBar = PBar.getInstance();
    if (!common.fileExists(path))
        throw new Error('Cant find the file');
    var list = xlsx.parse(path)[LIST_INDEX];
    progressBar.parseExcel(LAST_ROW - FIRST_ROW);
    var parser = await( new MainParser(list));
    var results = parser.getSchoolResults();
    progressBar.dbWrite(results.length);
    var dbWriter = await(new DbWriter(results));
});

class PBar {
    constructor() {}
    static getInstance() {
        if (!PBar.instance)
            PBar.instance = new PBar();
        return PBar.instance;
    } 
    parseExcel(length) {
        if (this.pbar)
            this.pbar.terminate();
        this.pbar = new ProgressBar('Parsing excel :bar :current/:total', { 
            total: length,
            width: 30 
        });
    }
    
    dbWrite(length) {
        if (this.pbar)
            this.pbar.terminate();
        this.pbar = new ProgressBar('Writing to database :bar :current/:total', { 
            total: length,
            width: 30 
        });
    }

    tick() {
        if (this.pbar)
            this.pbar.tick();
    }
}


class DbWriter {
    /**
     * @param {object} data JSON with parsed data from spreadsheet
     */
    constructor(data) {
        this.data = data;
        this.cachedSubjects = [];
        this.start_();
    }

    /**
     * @private
     */
    start_() {
        await(
           this.data.forEach(schoolNode => {
               this.parseSchool_(schoolNode);
           })
         );
    }
    
    /**
     * @private
     * @param {object} schoolNode JSON node with information about one school
     */
    parseSchool_(schoolNode) {
        var school = schoolNode.school;
        await (services.studyResult.dropEgeResults(school.id));
        await (schoolNode.results.forEach(yearNode => {
            this.parseYear_(yearNode, school);
        }));
        PBar.getInstance().tick();
    }
    
    /**
     * @private
     * @prarm {string} subject Subject name
     * @returns {object} subject instance
     */
    getSubject_(subjectName) {
        subjectName = subjectName
            .toLowerCase()
            .trim();
        var cachedSubject = 
            this.cachedSubjects.find(subject => subject.name == subjectName);
        if (!cachedSubject) {
            cachedSubject = 
                await(services.subject.getOrCreate(subjectName));
            this.cachedSubjects.push(cachedSubject);
        }
        return cachedSubject;
    }

    /**
     * @private
     * @param {object} yearNode JSON node with information about year results
     * @param {object} school School instance
     */
    parseYear_(yearNode, school) {
        var year = yearNode.year;
        yearNode.results.forEach(record => {
            var subject = await(this.getSubject_(record.subject));
            var ege = {
                year: year,
                schoolId: school.id,
                subjectId: subject.id,
                result: record.result
            };
            services.studyResult.createEge(ege);
        });
    }


}

class MainParser {
    /**
     * @param {object} sheet spreadsheet list object
     */
    constructor(sheet) {
        this.sheet = sheet.data;
        this.schoolResults = [];
        this.subjects = [];
        this.currentRowIndex = FIRST_ROW;
        this.currentRow = this.sheet[this.currentRowIndex];
        this.isEmtyRow = true;
        while (this.currentRowIndex <= LAST_ROW)
            this.parseSchool_();

    }
    
    static getYear(string) {
        return string.replace(/\D/g, ''); //leave only digits
    }
    
    /**
     * @param {string} site 
     * @returns {object} instance School instance
     */
    static getSchool(site) {
        site = site.replace(/http:\/\//g, ''); //remove 'http://'
        var instance = await(services.school.findBySite(site));
       // if (!instance)
       //      /console.log(colors.red('Cant find school for site ' + site));
        return instance;
    }

    /**
     * @param {number} result
     * @param {int} col number
     * @returns {number} normalized result
     */
    static normalizeResult(result, col, year) {
        var subjectIndex  = (col - FIRST_COL) % (SUBJECT_COUNT * 2);
        if (subjectIndex == BASE_MATH_COLUMN_INDEX) {
            if (year != BASE_MATH_YEAR)
                result =  '';
            else if (typeof result != 'string' && result > 5) {
                switch (true) {
                    case (result <= 6):
                        result = 2;
                        break;
                    case (result > 6 && result <= 11):
                        result = 3;
                        break;
                    case (result > 11 && result <= 16):
                        result = 4;
                        break;
                    case (result > 16 && result <= 20):
                        result = 5;
                        break;
                    default:
                        throw new Error('Undexpected base math result: ' + result);
                }
            }
        }
        return result;
    }

    /**
     * @private
     */
    incrementRow_() {
        this.currentRowIndex++;
        this.currentRow = this.sheet[this.currentRowIndex];
        PBar.getInstance().tick();
    }

    /**
     * @private
     * @param {int} rowNumber
     */
    setRow_(rowNumber) {
        var tickCount = Math.abs(rowNumber - this.currentRowIndex);
        this.currentRowIndex = rowNumber;
        this.currentRow = this.sheet[this.currentRowIndex];
        PBar.getInstance().tick(tickCount);
    }
    /**
     * @public
     * @returns JSON with parsed data
     */
    getSchoolResults() {
        return this.schoolResults;
    }
    
    /**
     * @private
     * @param {int} startColumn 
     */
    parseYear_(startColumn) {
        var endColumn = startColumn + SUBJECT_COUNT; 
        var yearRes = {
            year: MainParser.getYear(this.sheet[YEAR_ROW][startColumn]),
            results: []
        };
        for (var i = startColumn; i<endColumn; i++) {
            var subject = this.sheet[SUBJECT_ROW][i];
            var result = this.currentRow[i]|| ''; 
                result = MainParser.normalizeResult(result, i, yearRes.year);
            if (result && typeof result != 'string') {
                this.isEmtyRow = false;
                yearRes.results.push({
                    subject: subject,
                    result: result
                });
            }
        }
        return yearRes;
    }
    
    /**
     * @private
     * @param {int} startColumn 
     * @prama {int} depCount Departament count
     */
    parseDepartamYear_(startColumn, depCount) {
        var endColumn = startColumn + SUBJECT_COUNT; 
        var yearRes = {
            year: MainParser.getYear(this.sheet[YEAR_ROW][startColumn]),
            results: []
        };
        for (var i = startColumn; i < endColumn; i++) {
            var subject = this.sheet[SUBJECT_ROW][i];
            var depResults = [];
            for (var n = 0; n < depCount; n++ ){
                var depResult = this.sheet[this.currentRowIndex + n][i] || 0;
                depResult = MainParser.normalizeResult(depResult, i, yearRes.year);
                depResults.push(depResult);
            }
            var depSum = depResults.reduce((a, b) => {return a + b;}, 0);
            var result =  depSum / depCount;
            if (result) {
                yearRes.results.push({
                    subject: subject,
                    result: result
                });
            }
        }
        return yearRes;
    }

    /**
     * @private
     */
    parseDepartaments_() {
        var result = [];
        var depCount = 0;
        while (!this.sheet[this.currentRowIndex + 1 + depCount][SITE_INDEX]) {
            depCount++;
        }
        if (depCount) {
            this.incrementRow_(); //go to first departament
            for (var i = 0; i< YEAR_COUNT; i++){
                var column = FIRST_COL + (i * 2 * SUBJECT_COUNT);//2 to skip the gia 
                var yearRes = this.parseDepartamYear_(column, depCount);
                if (yearRes.results.length)
                    result.push(yearRes);
            }
            this.setRow_(this.currentRowIndex + depCount - 1) //-1 because row would be incrementade once after school parsing
        }
        
        return result;
    }

    /**
     * @private
     */
    parseSchool_() {
        var site = this.currentRow[SITE_INDEX];
        var school;
        if (site) 
            school = await(MainParser.getSchool(site));
        if (school){
            var schoolResult = {results: []};
            schoolResult.school = school;
            this.isEmtyRow = true;
            
            for (var i = 0; i< YEAR_COUNT; i++){
                var column = FIRST_COL + (i * 2 * SUBJECT_COUNT);//2 to skip the gia 
                var yearRes = this.parseYear_(column);
                if (yearRes.results.length)
                    schoolResult.results.push(yearRes);
            }
            if (this.isEmtyRow === true) {  //if there is no results for school try to parse departments
                schoolResult.results = this.parseDepartaments_();
            }
            this.schoolResults.push(schoolResult);
        }
        this.incrementRow_();
    }
}



/**
 * Settings for accessing this script using cli
 */
commander
    .command('egeData <path>')
    .description('Parses an .xlsx file from a given path')
    .action(file => parse(file));

exports.Command;

