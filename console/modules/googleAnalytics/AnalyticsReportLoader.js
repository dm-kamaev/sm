/**
 * @fileoverview Class for load data from goople analytics api and update it
 * on courses
 */
'use strict';

const await = require('asyncawait/await');
const lodash = require('lodash');

const services = require('../../../app/components/services').all;
const sequelize = require('../../../app/components/db');
const logger = require('../../../app/components/logger/logger')
    .getLogger('app');

const googleApi = require('googleapis');
const key = require('../../../assets/school-market-55aa2d283f38.json');

const config = require('../../../app/config/config.json');
const VIEW_ID = config.courses.analyticsViewId;

/**
 * Api parameters
 */
const VERSION = 'v3';

/**
 * api request parameters
 */
const LIST_NAME_DIMENTION = 'ga:productListName',
    LIST_NAME_VALUE = 'search results',
    START_DATE = '14daysAgo',
    END_DATE = 'today';
const PARAMS = {
    productName: {
        queryName: 'ga:productName',
        name: 'name'
    },
    category: {
        queryName: 'ga:productCategoryHierarchy',
        name: 'category'
    },
    ctr: {
        queryName: 'ga:productListCTR',
        name: 'ctr'
    },
    clicks: {
        queryName: 'ga:productListClicks',
        name: 'clicks'
    },
    views: {
        queryName: 'ga:productListViews',
        name: 'views'
    }
};
const MAX_RESULTS = 500;

class AnalyticsReportLoader {

    /**
     * @constructor
     */
    constructor() {
        /**
         * Google analytics api instance
         * @type {Object}
         */
        this.analyticsApi_ = googleApi.analytics(VERSION);

        /**
         * Google jwt client instance
         * @type {googleApi.auth.JWT}
         */
        this.jwt_ = null;
    }

    /**
     * Init
     * @param {{
     *     isSilent: boolean
     * }} options
     * @public
     */
    init(options) {
        if (options.isQuiet) {
            sequelize.options.logging = false;
        }
        try {
            await(this.authorize_());
        } catch (error) {
            logger.error(error);
        }
    }

    /**
     * Get data from google analytics api and write it to db
     * @public
     */
    updateCourseAnalytics() {
        let data = await(this.loadReport_());
        let headers = this.initHeaders_(data.columnHeaders);
        let coursesAnalytics = this.getCoursesAnalytics_(
            data.rows, headers
        );
        this.fillDb_(coursesAnalytics);
    }

    /**
     * Authorize with given credentials from key file
     * @return {Promise}
     * @private
     */
    authorize_() {
        this.jwt_ = new googleApi.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            ['https://www.googleapis.com/auth/analytics.readonly'],
            null
        );
        return new Promise((resolve, reject) => {
            this.jwt_.authorize((error, responce) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(responce);
                }
            });
        });
    }


    /**
     * Load report from google analytics api
     * @return {Promise}
     * @private
     */
    loadReport_() {
        let metrics =
            `${PARAMS.ctr.queryName},` +
            `${PARAMS.clicks.queryName},` +
            `${PARAMS.views.queryName}`;
        let dimensions = `${PARAMS.productName.queryName},` +
            `${PARAMS.category.queryName}`;

        return new Promise((resolve, reject) => {
            this.analyticsApi_.data.ga.get({
                'auth': this.jwt_,
                'ids': VIEW_ID,
                'end-date': END_DATE,
                'start-date': START_DATE,
                'filters': `${LIST_NAME_DIMENTION}==${LIST_NAME_VALUE}`,
                'dimensions': dimensions,
                'sort': `-${PARAMS.ctr.queryName}`,
                'metrics': metrics,
                'max-results': MAX_RESULTS
            }, function(error, responce) {
                if (error) {
                    logger.error(error);
                    reject(error);
                } else {
                    resolve(responce);
                }
            });
        });
    }


    /**
     * Init header positions
     * @param {Array<{
     *     name: string
     * }>} headers
     * @return {Array<string>}
     * @private
     */
    initHeaders_(headers) {
        return headers.map((header, index) => {
            let param = lodash.find(PARAMS, (paramObject) => {
                return header.name == paramObject.queryName;
            });

            return param.name;
        });
    }


    /**
     * Get analytics data from given rows with given headers
     * @param {Array<Array<string>>} rows
     * @param {Array<string>} headers
     * @return {Array<{
     *     name: string,
     *     ctr: number,
     *     clicks: number,
     *     views: number,
     *     category: string
     * }>}
     * @private
     */
    getCoursesAnalytics_(rows, headers) {
        let callback = lodash.partial(this.getRowAnalytics_, headers);
        return rows.map(callback);
    }

    /**
     * Transform row to course object
     * @param {Array<string>} headers
     * @param {Array<string>} row
     * @return {{
     *     name: string,
     *     ctr: number,
     *     clicks: number,
     *     views: number,
     *     category: string
     * }}
     * @private
     */
    getRowAnalytics_(headers, row) {
        return row.reduce((previous, current, index) => {
            let fieldName = headers[index];
            previous[fieldName] = current;

            return previous;
        }, {});
    }


    /**
     * Fill db with given data
     * @param {Array<{
     *     name: string,
     *     ctr: number,
     *     clicks: number,
     *     views: number,
     *     category: string
     * }>} data
     * @private
     */
    fillDb_(data) {
        data.forEach(function(courseData) {
            let course = await(services.course.getGetByNameAndCategoryAlias(
                courseData.category, courseData.name
            ));
            if (course) {
                services.course.updateCtr({
                    courseId: course.id,
                    ctr: courseData.ctr,
                    clicks: courseData.clicks,
                    views: courseData.views
                });
            }
        }, this);
    }
};

module.exports = AnalyticsReportLoader;
