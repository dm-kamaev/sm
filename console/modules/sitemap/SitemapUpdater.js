'use strict';

const path = require('path');
const fs = require('fs');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const sitemap = require('sitemap');

const urlService = require('../../../api/modules/entity/services/urls');
const config = require('../../../app/config').config;


class SitemapUpdater {
    constructor(subdomain) {
        this.hostName_ = config.protocol + '://' + config.schools.host;

        this.sitemapPath_ = path.join(
            __dirname,
            '../../../public/' + subdomain + '/sitemap.xml'
        );

        this.sitemap_ = [];
    }

    /**
     * Update Sitemap
     * @public
     */
    update() {
        var urls = this.generateUrlsArray_();
        this.sitemap_ = this.generateSitemap_(urls);
        this.writeSitemap_(this.sitemap_);
    }

    /**
     * Generation urls array for Sitemap
     * @return {Array}
     * @private
     */
    generateUrlsArray_() {
        var urls = ['/'],
            schoolUrls = await(this.getSchoolsUrls_());

        return urls.concat(schoolUrls);
    }

    /**
     * Generate Sitemap
     * cacheTime = 1 day (cache purge period)
     * @param {Array} urls
     * @return {Array.<Object>}
     * @private
     */
    generateSitemap_(urls) {
        var minute = 60000,
            day = minute * 60 * 24;

        var sitemapUrls = urls.map(this.generateUrlData_, this);

        return sitemap.createSitemap({
            hostname: this.hostName_,
            cacheTime: day,
            urls: sitemapUrls
        });
    }

    /**
     * Write Sitemap in file
     * @param {Array.<Object>} sitemapObject
     * @private
     */
    writeSitemap_(sitemapObject) {
        if (!fs.existsSync(this.sitemapPath_)) {
            fs.open(this.sitemapPath_, "wx", function (err, fd) {
                fs.close(fd);
            });
        }
        fs.writeFileSync(this.sitemapPath_, sitemapObject.toString());
    }

    /**
     * Get schools Urls
     * @return {Array}
     * @private
     */
    getSchoolsUrls_() {
        var urls = await(urlService.getAllSchoolUrls());
        return urls.map(url => '/school/' + url);
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
            lastmodfile: this.sitemapPath_
        };
    }
};

module.exports = SitemapUpdater;
