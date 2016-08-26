'use strict';
const cheerio = require('cheerio');
const request = require('request');
const await = require('asyncawait/await');

var modules = require('../../../../api/modules'); // eslint-disable-line
var services = require('../../../../app/components/services').all;
var SchoolSearcher = require('../SchoolSearcher');

class RatingParser {
    /**
     * @public
     * @param {string} path
     */
    constructor(path) {
        this.results_ = [];
        this.path_ = path;

        this.dbSchools_ = await(services.school.listInstances());
        this.schoolSearcher_ = new SchoolSearcher(this.dbSchools_);

        this.makeRequest_();
        this.processTable_();
    }

    /**
     * @public
     */
    get results() {
        return this.results_.filter(res => res !== null);
    }

    /**
     * @private
     */
    makeRequest_() {
        var promise = new Promise((resolve, reject) => {
            request(this.path_, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                } else {
                    reject('Cant geta the body');
                }
            });
        });
        this.html_ = await(promise);
        this.cheerioDom_ = cheerio.load(this.html_);
    }

    /**
     * @private
     */
    processTable_() {
        var table = this.cheerioDom_('.st');
        var tableData = table.find('tbody').children();

        tableData.each((i, elem) => {
            this.results_.push(this.processRow_(elem));
        });
    }

    /**
     * @private
     * @param {object} row - cheerio node
     * @return {object}
     */
    processRow_(row) {
        row = this.cheerioDom_(row);
        var childrens = row.children();
        var rating = this.cheerioDom_(childrens.get(0)).text();
        var siteNode = this.cheerioDom_(childrens.get(1)).find('a');
        var name = this.cheerioDom_(childrens.get(1)).text();
        var school = this.schoolSearcher_.find([{
            name: name
        }])[0];
        var site = siteNode.attr('href');
        if (site || school) {
            return {
                id: school.id,
                rankDogm: rating.trim(),
                name: name
                    .trim()
                    .replace(/\s+/g,' '),
                site: site && site
                    .replace(/http:\/\//,'')
                    .replace(/\//,'')
            };
        } else {
            return null;
        }
    }
}

module.exports = RatingParser;
