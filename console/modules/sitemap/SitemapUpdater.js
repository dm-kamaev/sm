'use strict';

const path = require('path');
const fs = require('fs');

const await = require('asyncawait/await');

const sitemap = require('sitemap');

const urlService = require('../../../api/modules/entity/services/urls');

const services = require('../../../app/components/services').all;
const config = require('../../../app/config').config;

const courseView = require('../../../api/modules/course/views/courseView'),
    searchView = require('../../../api/modules/course/views/searchView'),
    seoView = require('../../../api/modules/school/views/seoView');

const entityTypeEnum =
    require('../../../api/modules/entity/enums/entityType.js');

class SitemapUpdater {
    /**
     * Constructor
     * @param {string} entityType
     */
    constructor(entityType) {
        /**
         * Subdomain page
         * @type {string}
         * @private
         */
        this.subdomain_ = entityType + 's';


        /**
         * Host name
         * @type {string}
         * @private
         */
        this.hostName_ = config.protocol + '://' + config[this.subdomain_].host;


        /**
         * Path to put generated sitemap file
         * @type {string}
         * @private
         */
        this.outputPath_ = path.join(
            __dirname,
            '../../../public/' + this.subdomain_ + '/sitemap.xml'
        );


        /**
         * Array of aliases pages by default
         * @type {Array<string>}
         * @private
         */
        this.defaultAliases_ = ['/'];


        /**
         * Entity type of page for which generated sitemap
         * @type {string}
         */
        this.entityType_ = entityType;


        /**
         * Sitemap data
         * @type {Array<Object>}
         */
        this.sitemap_ = [];
    }


    /**
     * Update Sitemap
     * @public
     */
    update() {
        let aliases = this.getAliases_();
        this.sitemap_ = this.generateSitemap_(aliases);
        this.writeSitemap_(this.sitemap_);
    }


    /**
     * Generation array of aliases for Sitemap
     * @return {Array<string>}
     * @private
     */
    getAliases_() {
        let aliases = [];

        let entityAliases = this.getEntityAliases_(),
            seoAliases = this.getSeoAliases_();

        return aliases.concat(
            this.defaultAliases_,
            entityAliases,
            seoAliases
        );
    }

    /**
     * Generate Sitemap
     * cacheTime = 1 day (cache purge period)
     * @param {Array<string>} aliases
     * @return {Array<Object>}
     * @private
     */
    generateSitemap_(aliases) {
        let minute = 60000,
            day = minute * 60 * 24;

        let sitemapData = aliases.map(this.generateData_, this);

        return sitemap.createSitemap({
            hostname: this.hostName_,
            cacheTime: day,
            urls: sitemapData
        });
    }


    /**
     * Write Sitemap in file
     * @param {Array.<Object>} sitemapObject
     * @private
     */
    writeSitemap_(sitemapObject) {
        if (!fs.existsSync(this.outputPath_)) {
            fs.open(this.outputPath_, 'wx', function(err, fd) {
                if (err) {
                    console.log(`Can't access ${this.outputPath_}: ${err}`);
                } else {
                    fs.close(fd);
                }
            });
        }
        try {
            fs.writeFileSync(this.outputPath_, sitemapObject.toString());
        } catch (error) {
            console.log(`Can't create sitemap.xml: ${sitemapObject}`);
        }
    }


    /**
     * Get entity aliases
     * @return {Array<string>}
     * @private
     */
    getEntityAliases_() {
        let aliases;
        if (this.entityType_ == entityTypeEnum.SCHOOL) {
            aliases = this.getSchoolAliases_();
        } else if (this.entityType_ == entityTypeEnum.COURSE) {
            aliases = this.getCourseAliases_();
        }
        return aliases;
    }


    /**
     * Get seo aliases
     * @return {Array<string>}
     * @private
     */
    getSeoAliases_() {
        let aliases;
        if (this.entityType_ == entityTypeEnum.SCHOOL) {
            aliases = this.getSeoSchoolAliases_();
        }
        return aliases;
    }


    /**
     * Get course aliases
     * @return {Array<string>}
     * @private
     */
    getCourseAliases_() {
        let courseList = await(services.course.list(
            searchView.initSearchParams({}))
        );
        let aliases = await(services.course.getAliases(courseList));

        let aliasedCourses = courseView.joinAliases(
            courseList, aliases
        );

        return courseView.list(aliasedCourses).map(course =>
            '/' + course.alias
        );
    }


    /**
     * Get school aliases
     * @return {Array<string>}
     * @private
     */
    getSchoolAliases_() {
        let aliases = await(urlService.getAllSchoolUrls());
        return aliases.map(url => '/' + this.entityType_ + '/' + url);
    }


    /**
     * Get seo school aliases
     * @return {Array<string>}
     * @private
     */
    getSeoSchoolAliases_() {
        let seoSchoolList = await(services.seoSchoolList.getAll()),
            linksList = seoView.linksList(seoSchoolList);

        return linksList.map(link => link.url);
    }


    /**
     * Add one page data for Sitemap
     * @param {string} url
     * @return {Object}
     * @private
     */
    generateData_(url) {
        return {
            url: url,
            changefreq: 'monthly',
            lastmodrealtime: true,
            lastmodfile: this.outputPath_
        };
    }
};

module.exports = SitemapUpdater;
