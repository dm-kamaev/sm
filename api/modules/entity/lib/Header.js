'use strict';

const entityTypeEnum = require('../enums/entityType');

class Header {

    /**
     * Creates an instance of Header.
     * @constructor
     */
    constructor() {
        /**
         * current entity type
         * @string
         * @private
         */
        this.entityType_;

        /**
         * Links to other entity sites
         * @type {Object<string, string>}
         * @private
         */
        this.entityLinks_ = {};

        /**
         * Current header params
         * @type {{
         *     data: Object<string, (string|Array|Object)>,
         *     config: Object<string, (string|Array|Object)>
         * }}
         * @private
         */
        this.params_ = {
            data: {},
            config: {}
        };
    }

    /**
     * Initializes class
     * @param {{
     *     entityType: string,
     *     links: Object<string, string>
     * }} data
     * @public
     */
    init(data) {
        this.setEntityType(data.entityType);
        this.setEntityLinks(data.entityLinks);

        this.setContacts()
            .setHelperText()
            .setMenuItems();
    }


    /**
     * Return current params for header
     * @return {{
     *     data: Object<string, (string|Array|Object)>,
     *     config: Object<string, (string|Array|Object)>
     * }}
     * @public
     */
    getParams() {
        return this.params_;
    }

    /**
     * Entity type setter
     * @param {string} entityType
     * @public
     */
    setEntityType(entityType) {
        this.entityType_ = entityType;
    }

    /**
     * Entity links setter
     * @param {Object<string, string>} entityLinks
     * @public
     */
    setEntityLinks(entityLinks) {
        this.entityLinks_ = entityLinks;
    }

    /**
     * Set cocontacts block data
     * @return {Header}
     * @protected
     */
    setContacts() {
        this.params_.data.contacts = {
            phone: '+7 (495) 478-68-24'
        };

        return this;
    }

    /**
     * Set helper text
     * @return {Header}
     * @protected
     */
    setHelperText() {
        let helperText;

        switch (this.entityType_) {
        case entityTypeEnum.SCHOOL:
            helperText = 'Поможем выбрать школу!';
            break;
        case entityTypeEnum.COURSE:
            helperText = 'Поможем выбрать курс!';
            break;
        }

        this.params_.data.helperText = helperText;

        return this;
    }

    /**
     * Set menu items
     * @return {Header}
     * @protected
     */
    setMenuItems() {
        let possibleEnityTypes = [
            entityTypeEnum.SCHOOL,
            entityTypeEnum.COURSE
        ];

        this.params_.data.menuItems =
            this.generateMenuItems(possibleEnityTypes);
        return this;
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
            .concat(this.generateCommonMenuItem());
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
            name = 'Курсы и секции';
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
     *     url: string
     * }}
     * @protected
     */
    generateCommonMenuItem() {
        return {
            name: 'Мел',
            url: 'mel.fm'
        };
    }
}

module.exports = Header;
