'use strict';

const Subheader = require('../../entity/lib/Subheader');

const entityType = require('../../entity/enums/entityType');

class SchoolSubheader extends Subheader {

    /**
     * Init params for subheader
     */
    constructor() {
        super();


        /**
         * Entity type
         * @type {string}
         * @protected
         */
        this.entityType = entityType.SCHOOL;


        /**
         * Data for logo
         * @type {Object<string, string>}
         * @protected
         * @override
         */
        this.logo = {
            altText: '«Школы Мела»',
            linkUrl: '/',
            imgUrl: '/static/images/n-common/b-sm-subheader/school-logo.svg'
        };


        /**
         * Links data
         * @type {Object<string, string>}
         * @protected
         * @override
         */
        this.links = {
            nameL: 'Все школы Москвы',
            nameM: 'Все школы',
            url: '/school'
        };


        /**
         * Data for search
         * @type {Object<string, string>}
         * @protected
         * @override
         */
        this.search = {
            placeholder: 'Район, метро, номер школы',
            pageAlias: 'school'
        };
    }
}

module.exports = SchoolSubheader;
