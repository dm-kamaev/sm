'use strict';

const Subheader = require('../../entity/lib/Subheader');

const entityType = require('../../entity/enums/entityType');

class CourseSubheader extends Subheader {

    /**
     * Init params for subheader
     */
    constructor() {
        super();


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
        this.listLinks = {
            opener: 'Все курсы',
            content: {
                items: []
            }
        };


        /**
         * Links data
         * @type {Object<string, string>}
         * @protected
         * @override
         */
        this.links = {
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


    /**
     * Config setter
     * @param {boolean} isBottomLine
     * @override
     * @public
     */
    setConfig(isBottomLine) {
        super.setConfig(isBottomLine);

        this.params.config.entityType = entityType.COURSE;
    }
}

module.exports = CourseSubheader;
