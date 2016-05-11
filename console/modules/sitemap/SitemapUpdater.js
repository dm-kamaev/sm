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

class SitemapUpdater {
    constructor() {
        this.urls = [];
    }

    /**
     * Update Sitemap
     */
    update() {
        this.generateData_();
        this.generateSitemap_();
        this.writeSitemap_();
    }

    /**
     * Generation data for Sitemap
     */
    generateData_() {
        this.addUrlData_('/');

        var schoolsUrls = await(this.generateSchoolsUrls_());
        for (var i = 0, len = schoolsUrls.length; i < len; i++) {
            this.addUrlData_(schoolsUrls[i]);
        }
    }

    /**
     * Generation schools Urls for Sitemap
     * @return {Array}
     */
    generateSchoolsUrls_() {
        var urls = await(urlService.getAllUrls()); 
        return urls.map(urlItem => hostName + '/school/' + urlItem);
    }

    /**
     * Add url data for Sitemap
     */
    addUrlData_(urlItem) {
        this.urls.push({
            url: urlItem,
            changefreq: 'monthly',
            lastmodrealtime: true,
            lastmodfile: sitemapPath
        })
    }

    /**
     * Generate Sitemap
     * cacheTime = 5 days (cache purge period)
     */
    generateSitemap_() {
        var minute = 60000,
            fiveDays = minute * 60 * 24 * 5;

        this.sitemap = sitemap.createSitemap({
            hostname: hostName,
            cacheTime: fiveDays,
            urls: this.urls
        });
    }

    /**
     * Write Sitemap in file
     */
    writeSitemap_() {
        if (!fs.existsSync(sitemapPath)) {
            fs.open(sitemapPath, "wx", function (err, fd) {
                fs.close(fd);
            });
        }
        fs.writeFileSync(sitemapPath, this.sitemap.toString());
    }
};

module.exports = SitemapUpdater;
