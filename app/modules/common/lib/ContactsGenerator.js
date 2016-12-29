/**
 * @fileOverview Class for generating contacts
 * (for header and subheader )
 */
'use strict';

class ContactsGenerator {
    /**
     *
     * @constructor
     */
    constructor() {
        /**
         * Contacts
         * @type {Object<string, string>}
         * @private
         */
        this.contacts_ = {
            phone: '+7 (929) 987-56-98'
        };
    }

    /**
     * Contacts
     * @return {Object<string, string>}
     * @public
     */
    get contacts() {
        return this.contacts_;
    }
}

module.exports = ContactsGenerator;
