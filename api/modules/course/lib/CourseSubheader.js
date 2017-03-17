'use strict';

const SubHeader =
    require('../../../../app/modules/common/lib/SubHeader').SubHeader;

const entityType = require('../../entity/enums/entityType');

class CourseSubheader extends SubHeader {

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
        this.entityType = entityType.COURSE;


        /**
         * Data for logo
         * @type {Object<string, string>}
         * @protected
         * @override
         */
        this.logo = {
            altText: '«Курсы Мела»',
            linkUrl: '/',
            imgUrl: '/static/images/n-common/b-sm-subheader/course-logo.svg'
        };


        /**
         * Links data
         * @type {Object<string, (string|Array|Object)>}
         * @protected
         * @override
         */
        this.dropdownLinks = {
            data: {
                opener: 'Все курсы'
            }
        };


        /**
         * Link data
         * @type {Object<string, string>}
         * @protected
         * @override
         */
        this.link = {
            nameL: 'Все курсы, кружки и секции',
            nameM: 'Все курсы',
            url: '/search'
        };


        /**
         * Data for search
         * @type {Object<string, string>}
         * @protected
         * @override
         */
        this.search = {
            placeholder: 'Район, метро, название курса',
            pageAlias: 'search'
        };
    }
}

module.exports = CourseSubheader;
