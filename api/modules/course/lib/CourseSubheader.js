'use strict';

const Subheader = require('../../entity/lib/Subheader');

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
            imgUrl: '/static/images/n-common/b-sm-subheader/course-logo.svg'
        };


        /**
         * Links data
         * @type {Object<string, (string|Array|Object)>}
         * @protected
         * @override
         */
        this.listlinks = {
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
            placeholder: 'Район, метро, название курса'
        };
    }
}

module.exports = CourseSubheader;
