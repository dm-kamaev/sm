'use strict';

const path = require('path');
const fs = require('fs');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const sitemap = require('sitemap');

const urlService = require(path.join(__dirname, '../../../api/modules/school/services/urls'));

const config = require(path.join(__dirname, '../../../app/config')).config;
const hostName = config.url.protocol + '://' + config.url.host;

const sitemapPath = path.join(__dirname, '../../../assets/sitemap.xml');

class SitemapCreator {
    constructor() {
        this.cacheTime = 600000; //600 sec (10 min) cache purge period
        this.urls = [];
    }

    /**
     * Create Sitemap
     */
    create() {
        this.generateData_();
        this.generate_();
        this.write_();
    }

    /**
     * Generation schools Urls for Sitemap
     * @return {Array}
     */
    generateSchoolsUrls_() {
        var urls = await(urlService.getAllUrls()); 
        return urls.map(urlItem => hostName + '/school/' + urlItem + '/');
    }

    /**
     * Generation data for Sitemap
     */
    generateData_() {
        this.addData_('/', 0.5);

        var schoolsUrls = await(this.generateSchoolsUrls_());
        for (var i = 0, len = schoolsUrls.length; i < len; i++) {
            this.addData_(schoolsUrls[i], 0.5);
        }
    }

    /**
     * Add data for Sitemap
     */
    addData_(urlItem, priority) {
        this.urls.push({
            url: urlItem,
            changefreq: 'monthly',
            priority: priority,
            lastmodrealtime: true,
            lastmodfile: sitemapPath
        })
    }

    /**
     * Generate Sitemap
     */
    generate_() {
        this.sitemap = sitemap.createSitemap({
            hostname: hostName,
            cacheTime: this.cacheTime,
            urls: this.urls
        });
    }

    /**
     * Write Sitemap in file
     */
    write_() {
        console.log(this.sitemap.toString());
        fs.writeFileSync(sitemapPath, this.sitemap.toString());
    }
}

module.exports = SitemapCreator;