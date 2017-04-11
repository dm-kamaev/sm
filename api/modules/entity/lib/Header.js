'use strict';

const Menu = require('../../../../app/modules/common/lib/Menu'),
    ContactsGenerator =
        require('../../../../app/modules/common/lib/ContactsGenerator');

class Header {

    /**
     * Creates an instance of Header.
     * @param {{
     *     entityType: string,
     *     entityLinks: Object<string, string>
     * }} data
     * @constructor
     */
    constructor() {
        /**
         * Current header params
         * @type {{
         *     data: Object<string, (string|Array|Object)>,
         *     config: Object<string, (string|Array|Object)>
         * }}
         * @private
         */
        this.params_ = {};
    }

    /**
     * Initializes class
     * @param {{
     *     entityType: string,
     *     config: {
     *         protocol: string,
     *         courses: {
     *             host: string
     *         },
     *         schools: {
     *             host: string
     *         }
     *     }
     * }} data
     * @public
     */
    generateParams(data) {
        this.entityType = data.entityType;

        this.initParams()
            .setContacts()
            .setMenuItems(data);
    }


    /**
     * Return current params for header
     * @return {{
     *     data: Object<string, (string|Array|Object)>,
     *     config: Object<string, (string|Array|Object)>
     * }}
     * @public
     */
    get params() {
        return this.params_;
    }

    /**
     * Entity type setter
     * @param {string} entityType
     * @protected
     */
    set entityType(entityType) {
        this.entityType_ = entityType;
    }

    /**
     * Set initial value to params
     * @return {Header}
     * @protected
     */
    initParams() {
        this.params_ = {
            data: {},
            config: {}
        };

        return this;
    }

    /**
     * Set cocontacts block data
     * @return {Header}
     * @protected
     */
    setContacts() {
        let data = {
            entityType: this.entityType_
        };

        let contactsGenerator = new ContactsGenerator(data);
        this.params_.data.contacts = contactsGenerator.params;

        return this;
    }


    /**
     * Set menu items
     * @param {{
     *     entityType: string,
     *     entityLinks: Object<string, string>
     * }} data
     * @return {Header}
     * @protected
     */
    setMenuItems(data) {
        let menu = new Menu(data);
        this.params_.data.menuItems = menu.params;

        return this;
    }
}

module.exports = Header;
