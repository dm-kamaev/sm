/**
 * @fileOverview Class for generate links to entity subdomains and
 * external sites
 */
'use strict';

const entityType = require('../../../../api/modules/entity/enums/entityType');

const MEL_LINK_NAME = 'mel';

class LinksGenerator {
    /**
     * @param {{
     *     protocol: string,
     *     courses: {
     *         host: string
     *     },
     *     schools: {
     *         host: string
     *     }
     * }} config
     * @constructor
     */
    constructor(config) {
        /**
         * @type {Object<string, string>}
         * @private
         */
        this.links_ = this.generateLinks(config);
    }


    /**
     * Links getter
     * @return {Object<string, string>}
     * @public
     */
    get links() {
        return this.links_;
    }

    /**
     * @param {{
     *     protocol: string,
     *     courses: {
     *         host: string
     *     },
     *     schools: {
     *         host: string
     *      }
     * }} config
     * @return {Object<string, string>}
     * @protected
     */
    generateLinks(config) {
        return Object.assign(
            this.generateEnityLinks(config),
            this.generateExternalLinks()
        );
    }

    /**
     * Generate links for entity subdomains
     * @param {{
     *     protocol: string,
     *     courses: {
     *         host: string
     *     },
     *     schools: {
     *         host: string
     *     }
     * }} config
     * @return {Object<string, string>}
     */
    generateEnityLinks(config) {
        let protocol = config.protocol;
        return {
            [entityType.SCHOOL]: `${protocol}://${config.schools.host}`,
            [entityType.COURSE]: `${protocol}://${config.courses.host}`
        };
    }

    /**
     * Generate common links
     * @return {Object<string, string>}
     */
    generateExternalLinks() {
        return {
            [MEL_LINK_NAME]: 'http://mel.fm'
        };
    }
}

module.exports = LinksGenerator;
