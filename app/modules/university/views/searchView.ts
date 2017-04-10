/**
 * @fileoverview View for search page
 */
import {LayoutView} from '../../common/lib/Layout';

import {entityType} from '../../common/enums/entityType';
const pageName = require('../../common/enums/pageName');

import {UniversitySubHeader} from './UniversitySubHeader';
import {UniversityFooter} from './UniversityFooter';

import {
    lSearchUniversity
} from '../../../blocks/n-university/l-search_university/params';


class SearchView extends LayoutView {
    protected params: lSearchUniversity.Params;

    constructor() {
        super();

        this.views.subHeader = UniversitySubHeader;
        this.views.footer = UniversityFooter;

        this.entityType = entityType.UNIVERSITY;
        this.pageName = pageName.SEARCH;

        this.seo = {
            metaTitle: 'Поиск программ',
            metaDescription: 'Поиск программ'
        };

        this.subHeader = {
            isLogoRedirect: true,
            isSearchRedirect: false,
            isBottomLine: true
        };

        this.openGraph = {};
    }

    protected setParams(params) {
        super.setParams(params);

        this.setResultsList_();
        this.setFilterpanel_();
        this.setSearchParams_();
    }

    private setResultsList_() {
        this.params.data.resultsList = {
            sort: {
                opener: 'Сортировать ',
                defaultOpenerText: 'по популярности',
                content: {
                    items: [{
                        'label': 'по популярности',
                        'value': 4
                    }, {
                        'label': 'по возрастанию цены за час',
                        'value': 0
                    }, {
                        'label': 'по убыванию цены за час',
                        'value': 1
                    }, {
                        'label': 'по возрастанию цены за курс',
                        'value': 2
                    }, {
                        'label': 'по убыванию цены за курс',
                        'value': 3
                    }]
                }
            },
            entityList: {
                items: [],
                itemType: 'smItemEntity',
                itemConfig: {
                    enableCover: true
                }
            },
            declensionEntityType: {
                nom: 'програму',
                gen: 'программы',
                plu: 'программ'
            }
        };
    }

    private setFilterpanel_() {

        this.params.data.filterPanel = {};
    }

    private setSearchParams_() {
        this.params.data.searchParams = {
            page: 0
        };
    }
}

export const searchView = new SearchView();
