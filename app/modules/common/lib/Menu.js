/**
 * @fileOverview Class for generate params for menu (menu items, links, etc.)
 */
'use strict';

const entityTypeEnum =
    require('../../../../api/modules/entity/enums/entityType');

const LinksGenerator = require('./LinksGenerator');

class Menu {
    /**
     * @param {{
     *     entityType: string,
     *     config: {
     *         protocol: string,
     *         courses: {
     *             host: string
     *         },
     *         schools: {
     *             host: string
     *         },
     *         universities: {
     *             host: string
     *         }
     *     }
     * }} data
     * @constructor
     */
    constructor(data) {
        /**
         * Current entity type
         * @string
         * @private
         */
        this.entityType_ = data.entityType;


        /**
         * Links to other entity sites
         * @type {Object<string, string>}
         * @private
         */
        this.entityLinks_ = this.generateEntityLinks(data.config);

        /**
         * Menu params
         * @type {Array<{
         *     name: string,
         *     url: string,
         *     type: string,
         *     isSelected: boolean
         * }>}
         * @private
         */
        this.params_ = this.generateParams();
    }


    /**
     * Params getter
     * @return {Array<{
     *     name: string,
     *     url: string,
     *     type: string,
     *     isSelected: boolean
     * }>}
     * @public
     */
    get params() {
        return this.params_;
    }


    /**
     * Generate params
     * @return {Array<{
     *     name: string,
     *     url: string,
     *     type: string,
     *     isSelected: boolean
     * }>}
     * @protected
     */
    generateParams() {
        let possibleEnityTypes = [
            entityTypeEnum.SCHOOL,
            entityTypeEnum.COURSE,
            // entityTypeEnum.UNIVERSITY
        ];

        return this.generateMenuItems(possibleEnityTypes);
    }

        /**
     * Generate menu items
     * @param {Array<string>} entityTypes
     * @return {Array<{
     *     name: string,
     *     url: string,
     *     type: string,
     *     isSelected: boolean
     * }>}
     * @protected
     */
    generateMenuItems(entityTypes) {
        return entityTypes.map(this.generateMenuItem, this)
            .concat(this.generateExternalMenuItems());
    }

    /**
     * Generate menu item
     * @param {string} entityType
     * @return {{
     *     name: string,
     *     url: string,
     *     type: string,
     *     isSelected: boolean
     * }}
     * @protected
     */
    generateMenuItem(entityType) {
        return {
            name: this.getEntityName(entityType),
            url: this.getEntityUrl(entityType),
            type: entityType,
            isSelected: this.entityType_ == entityType
        };
    }

    /**
     * Generate menu item name
     * @param {string} entityType
     * @return {string}
     * @protected
     */
    getEntityName(entityType) {
        let name;

        switch (entityType) {
        case entityTypeEnum.SCHOOL:
            name = 'Школы';
            break;
        case entityTypeEnum.COURSE:
            name = 'Курсы';
            break;
        case entityTypeEnum.UNIVERSITY:
            name = 'Вузы';
            break;
        }
        return name;
    }

    /**
     * Generate menu item url
     * @param {string} entityType
     * @param {Object<string, string>} hostNames
     * @return {string}
     * @protected
     */
    getEntityUrl(entityType, hostNames) {
        return this.entityLinks_[entityType];
    }

    /**
     * Generate menu item for mel.fm
     * @return {{
     *     name: string,
     *     url: string,
     *     target: string
     * }}
     * @protected
     */
    generateExternalMenuItems() {
        return {
            name: 'Мел',
            url: this.entityLinks_.mel,
            target: '_blank'
        };
    }

    /**
     * Generate links
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
     * @protected
     */
    generateEntityLinks(config) {
        let linksGenerator = new LinksGenerator(config);

        return linksGenerator.links;
    }
}

module.exports = Menu;
