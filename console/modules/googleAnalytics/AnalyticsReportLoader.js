'use strict';

const googleApi = require('googleapis');
const key = require('../../../assets/school-market-55aa2d283f38.json');

const VIEW_ID = 'ga:130630878';

class AnalyticsReportLoader {

    /**
     * @constructor
     */
    constructor() {
        /**
         * Google analytics api instance
         * @type {Object}
         */
        this.analyticsApi_ = googleApi.analytics('v3');

        /**
         * Google jwt client instance
         * @type {googleApi.auth.JWT}
         */
        this.jwt_ = null;
    }

    /**
     * Init
     * @public
     */
    init() {
        try {
            this.authorize_();
            this.loadReport_();
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Authorize with given credentials from key file
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

        this.jwt_.authorize(function(error) {
            if (error) {
                console.log(error);
                throw new Error('Cant authorize');
            }
        });
    }

    /**
     * Load report
     */
    loadReport_() {
        this.analyticsApi_.data.ga.get({
            'auth': this.jwt_,
            'ids': VIEW_ID,
            'end-date': 'today',
            'start-date': '14daysAgo',
            'filters': 'ga:productListName==search results',
            'dimensions': 'ga:productName,ga:productSku',
            'sort': '-ga:productListCTR',
            'metrics': 'ga:productListCTR,ga:productListClicks',
            'max-results': 500
        }, function(err, responce) {
            if (err) {
                console.log(err);
            } else {
                console.log(JSON.stringify(responce, null, 4));
            }
        });
    }
};

module.exports = AnalyticsReportLoader;

if (!module.parent) {
    let analyticsReportLoader = new AnalyticsReportLoader();
    module.exports = analyticsReportLoader.init();
}
