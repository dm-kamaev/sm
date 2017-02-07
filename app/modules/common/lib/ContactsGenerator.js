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
         *     phone: string
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
     * @return {Array<{
     *     name: string,
     *     url: string,
     *     type: string,
     *     isSelected: boolean
     * }>}
     * @protected
     */
    generateParams() {
        return {
            helper: this.generateHelper(),
            phone: this.phone_
        }
    }


    /**
     * Generate helper
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
            helper = {
                text: 'Поможем выбрать ВУЗ',
                url: '/university',
                theme: 'neptune'
            };
            break;
        }

        return helper;
    }

}

module.exports = ContactsGenerator;
