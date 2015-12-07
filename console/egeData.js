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


var parse = async (function(path) {
    sequelize.options.logging = false;
    var progressBar = new PBar();
    if (!common.fileExists(path))
        throw new Error('Cant find the file');
    var list = xlsx.parse(path)[LIST_INDEX
    progressBar.parseExcel(LAST_ROW-FIRST_ROW);
    var parser = await( new MainParser(list));
    progressBar.dbWrite(100);
    progressBar.tick(); //todo: fix this and write results to db
    console.log(parser.getSchoolResults().length);
});
class PBar {
    constructor() {
        if (PBar.instance)
            throw new Error('THERE CAN BE ONLY ONE');
        PBar.instance = this;
        this.pbar = null;
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
    static tick() {
        PBar.instance.tick();
    }

    tick() {
        if (this.pbar)
            this.pbar.tick();
    }
}


class MainParser {
    constructor(sheet) {
        this.sheet = sheet.data;
        this.schoolResults = [];
        this.subjects = [];
        this.currentRowIndex = FIRST_ROW;
        this.currentRow = this.sheet[this.currentRowIndex];
        this.isEmtyRow = true;
        while (this.currentRowIndex <= LAST_ROW)
            this.parseSchool();

    }
    
    static getYear(string) {
        return string.replace(/\D/g, ''); //leave only digits
    }

    static getSchool(site) {
        site = site.replace(/http:\/\//g, ''); //remove 'http://'
        var instance = await(services.school.findBySite(site));
        if (!instance)
             ;//console.log(colors.red('Cant find school for site ' + site));
        return instance;
    }

    incrementRow() {
        this.currentRowIndex++;
        this.currentRow = this.sheet[this.currentRowIndex];
        PBar.tick();
    }
    setRow(integer) {
        var tickCount = Math.abs(integer - this.currentRowIndex);
        this.currentRowIndex = integer;
        this.currentRow = this.sheet[this.currentRowIndex];
        PBar.tick(tickCount);
    }
    getSchoolResults() {
        return this.schoolResults;
    }

    
    /**
     * @param {int} startColumn 
     */
    parseYear(startColumn) {
        var endColumn = startColumn + SUBJECT_COUNT; 
        var yearRes = {
            year: MainParser.getYear(this.sheet[YEAR_ROW][startColumn]),
            results: []
        };
        for (var i = startColumn; i<endColumn; i++) {
            var subject = this.sheet[SUBJECT_ROW][i];
            var result = this.currentRow[i]|| ''; 
                //result = result.replace(/[^0-9||\.]/g,'') //leave digits and dots
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
     * @param {int} startColumn 
     * @prama {int} depCount Departament count
     */
    parseDepartamYear(startColumn, depCount) {
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
                depResults.push(depResult);
            }
            var depSum = depResults.reduce((a, b) => {return a + b}, 0);
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
    
    parseDepartaments() {
        var result = [];
        var depCount = 0;
        while (!this.sheet[this.currentRowIndex + 1 + depCount][SITE_INDEX]) {
            depCount++;
        }
        if (depCount) {
            this.incrementRow(); //go to first departament
            for (var i = 0; i< YEAR_COUNT; i++){
                var column = FIRST_COL + (i * 2 * SUBJECT_COUNT);//2 to skip the gia 
                var yearRes = this.parseDepartamYear(column, depCount);
                if (yearRes.results.length)
                    result.push(yearRes);
            }
            this.setRow(this.currentRowIndex + depCount - 1) //-1 because row would be incrementade once after school parsing
        }
        
        return result;
    }

    parseSchool() {
        var site = this.currentRow[SITE_INDEX];
        var school;
        if (site) 
            school = await(MainParser.getSchool(site));
        if (school){
            var schoolResult = {results: []};
            var column = FIRST_COL;
            schoolResult.school = school;
            this.isEmtyRow = true;
            
            for (var i = 0; i< YEAR_COUNT; i++){
                var column = FIRST_COL + (i * 2 * SUBJECT_COUNT);//2 to skip the gia 
                var yearRes = this.parseYear(column);
                if (yearRes.results.length)
                    schoolResult.results.push(yearRes);
            }
            if (this.isEmtyRow == true) {
                schoolResult.results = this.parseDepartaments();
            }
            this.schoolResults.push(schoolResult);
        }
        this.incrementRow();
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

