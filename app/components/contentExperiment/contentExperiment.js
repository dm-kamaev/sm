/**
 * @fileOverview Utils for determinig factory name by query parameters,
 * given from google analytics content experiments
 */
'use strict';

const factoryName = require('../enum/factoryName');

const EXPERIMENT_PARAM_NAME = 'utm_expid';

let experiment = {};

/**
 * Get factory name from query params provided with google analytics experiments
 * @param {{
 *     utm_expId: (string|undefined)
 * }} queryParams
 * @return {string}
 */
experiment.getFactoryByQuery = function(queryParams) {
    let experimentParams = queryParams[EXPERIMENT_PARAM_NAME];
    let result;

    if (experimentParams) {
        // Params is a string with three parameters: experimentId, experiment
        // key and version divided with '.' delimiter
        let params = experimentParams.split('.');
        // The last element in params is version
        let version = params[params.length - 1];

        result = experiment.getFactoryByVersion(version);
    } else {
        result = factoryName.STENDHAL;
    }
    return result;
};

/**
 * Return factory name by version id
 * @param {string} version
 * @return {strict}
 */
experiment.getFactoryByVersion = function(version) {
    let result;
    if (version == '1') {
        result = factoryName.EXPERIMENTAL;
    } else {
        result = factoryName.STENDHAL;
    }
    return result;
};


/**
 * Return search template name by factory name
 * @param {string} factory
 * @return {strict}
 */
experiment.getSearchTemplateName = function(factory) {
    let result;

    if (factory == factoryName.EXPERIMENTAL) {
        result = 'sm.lSearch.TemplateExperimental.search';
    } else {
        result = 'sm.lSearch.Template.search';
    }

    return result;
};

module.exports = experiment;
