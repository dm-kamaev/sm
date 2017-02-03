'use strict';

const contentExperiment =
        require('../../../components/contentExperiment/contentExperiment');

const entityTypeEnum =
        require('../../../../api/modules/entity/enums/entityType');

const config = require('../../../config').config;

let configView = {
};


/**
 * Create params for template config
 * @param {{
 *     entityType: string,
 *     pageName: string,
 *     query: Object,
 *     csrf: string
 * }} params
 * @return {{
 *     modifier: string,
 *     entityType: string,
 *     page: string,
 *     staticVersion: string,
 *     analyticsId: string,
 *     experimentId: ?string,
 *     yandexMetrikaId: number,
 *     carrotquestId: string,
 *     domain: string,
 *     fbClientId: ?number,
 *     csrf: string
 * }}
 */
configView.render = function(params) {
    let subdomains = {
        [entityTypeEnum.SCHOOL]: 'schools',
        [entityTypeEnum.COURSE]: 'courses'
    };

    let subdomain = subdomains[params.entityType];

    return {
        modifier: contentExperiment.getFactoryByQuery(params.query),
        entityType: params.entityType,
        page: params.pageName,
        staticVersion: config.lastBuildTimestamp,
        analyticsId: config[subdomain].analyticsId,
        experimentId: config[subdomain].experimentId,
        yandexMetrikaId: config[subdomain].yandexMetrikaId,
        carrotquestId: config.carrotquestId,
        fbClientId: config.facebookClientId,
        domain: config[subdomain].host,
        csrf: params.csrf
    };
};


module.exports = configView;
