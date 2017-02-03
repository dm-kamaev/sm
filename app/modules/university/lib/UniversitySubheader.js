'use strict';

const Subheader = require('../../../../api/modules/entity/lib/Subheader');

const entityType = require('../../../../api/modules/entity/enums/entityType');

class UniversitySubheader extends Subheader {

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
            altText: '«ВУЗы Мела»',
            linkUrl: '/',
            imgUrl: '/static/images/n-common/b-sm-subheader/university-logo.svg'
        };


        /**
         * Links data
         * @type {Object<string, (string|Array|Object)>}
         * @protected
         * @override
         */
        this.listLinks = {
            opener: 'Все ВУЗы',
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
            nameL: 'Подобрать ВУЗ',
            nameM: 'Подобрать ВУЗ',
            url: '/search'
        };


        /**
         * Data for search
         * @type {Object<string, string>}
         * @protected
         * @override
         */
        this.search = {
            placeholder: 'ВУЗ, специальность',
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

module.exports = UniversitySubheader;
