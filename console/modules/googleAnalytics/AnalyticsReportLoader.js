'use strict';

const googleApi = require('googleapis');
const key = require('../../../assets/f80bcaabce2f.json');

class AnalyticsReportLoader {

    /**
     * @constructor
     */
    constructor() {
        /**
         * Google analytics api instance
         * @type {Object}
         */
        this.analyticsApi_ = googleApi.analytics('v4');
    }
};

module.exports = AnalyticsReportLoader;
