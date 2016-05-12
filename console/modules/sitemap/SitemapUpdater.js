'use strict';

const path = require('path');
const fs = require('fs');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const sitemap = require('sitemap');

const urlService = require('../../../api/modules/school/services/urls');

const config = require('../../../app/config').config;
const hostName = config.url.protocol + '://' + config.url.host;


class SitemapUpdater {
    constructor() {
        this.sitemapPath = path.join(__dirname, '../../../assets/sitemap.xml');
        this.sitemap = [];
    }

    /**
     * Update Sitemap
     * @public
     */
    update() {
        var urls = this.generateUrlsArray_();
        this.sitemap = this.generateSitemap_(urls);
        this.writeSitemap_(this.sitemap);
    }

    /**
     * Generation urls array for Sitemap
     * @return {Array.<Object>}
     * @private
     */
    generateUrlsArray_() {
        var urlsArray = [];

        urlsArray.push(this.generateUrlData_('/'));

        var schoolsUrls = await(this.getSchoolsUrls_());
        for (var i = 0, len = schoolsUrls.length; i < len; i++) {
            urlsArray.push(this.generateUrlData_(schoolsUrls[i]));
        }

        return urlsArray;
    }

    /**
     * Get schools Urls for Sitemap
     * @return {Array}
     * @private
     */
    getSchoolsUrls_() {
        var urls = await(urlService.getAllUrls());
        return urls.map(url=> '/school/' + url);
    }

    /**
     * Add url data for Sitemap
     * @param {string} url
     * @return {Object}
     * @private
     */
    generateUrlData_(url) {
        return {
            url: url,
            changefreq: 'monthly',
            lastmodrealtime: true,
            lastmodfile: this.sitemapPath
        };
    }

    /**
     * Generate Sitemap
     * cacheTime = 1 day (cache purge period)
     * @param {Array.<Object>} urls
     * @return {Array.<Object>}
     * @private
     */
    generateSitemap_(urls) {
        var minute = 60000,
            day = minute * 60 * 24;

        return sitemap.createSitemap({
            hostname: hostName,
            cacheTime: day,
            urls: urls
        });
    }

    /**
     * Write Sitemap in file
     * @param {Array.<Object>} siteMap
     * @private
     */
    writeSitemap_(siteMap) {
        if (!fs.existsSync(this.sitemapPath)) {
            fs.open(this.sitemapPath, "wx", function (err, fd) {
                fs.close(fd);
            });
        }
        fs.writeFileSync(this.sitemapPath, siteMap.toString());
    }
};

module.exports = SitemapUpdater;
