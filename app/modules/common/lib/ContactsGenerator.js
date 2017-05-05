/**
 * @fileOverview Class for generating contacts
 * (for header and subheader )
 */
'use strict';

const entityTypeEnum =
    require('../../../../api/modules/entity/enums/entityType');

class ContactsGenerator {
    /**
     * Creates an instance of ContactsGenerator
     * @param {{
     *     entityType: string
     * }} data
     * @constructor
     */
    constructor(data) {
        /**
         * Entity Type
         * @type {string}
         * @private
         */
        this.entityType_ = data.entityType;


        /**
         * Phone
         * @type {Object<string, string>}
         * @private
         */
        this.phone_ = '+7 (929) 987-56-98';


        /**
         * Contacts params
         * @type {{
         *     helper: {
         *         text: string,
         *         url: (string|undefined),
         *         theme: (string|undefined)
         *     },
         *     phone: ?string
         * }}
         * @private
         */
        this.params_ = this.generateParams();
    }


    /**
     * Params
     * @return {Object<string, (string|Array|Object)>}
     * @public
     */
    get params() {
        return this.params_;
    }


    /**
     * Generate params
     * @return {Object<string, (string|Array|Object)>}
     * @protected
     */
    generateParams() {
        return {
            helper: this.generateHelper(),
            phone: this.getPhone()
        };
    }


    /**
     * Generate helper
     * @return {Object<string, string>}
     * @protected
     */
    generateHelper() {
        let helper = {};

        switch (this.entityType_) {
        case entityTypeEnum.SCHOOL:
            helper.text = 'Поможем выбрать школу!';
            break;
        case entityTypeEnum.COURSE:
            helper.text = 'Поможем выбрать курс!';
            break;
        case entityTypeEnum.UNIVERSITY:
        case entityTypeEnum.PROGRAM:
            helper = {
                text: 'Поможем выбрать',
                url: 'http://maximumtest.ru/events/cons?utm_source=melpartner'
            };
            break;
        }

        return helper;
    }


    /**
     * Get phone
     * @return {?string}
     * @protected
     */
    getPhone() {
        let phone;

        if (this.entityType_ != entityTypeEnum.UNIVERSITY &&
            this.entityType_ != entityTypeEnum.PROGRAM) {
            phone = this.phone_;
        }

        return phone;
    }

}

module.exports = ContactsGenerator;
