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
            phone: '+7 (495) 478-68-24'
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
