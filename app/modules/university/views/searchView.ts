/**
 * @fileoverview View for search page
 */
import {LayoutView} from '../../common/lib/Layout';

import {entityType} from '../../common/enums/entityType';
import {filterName} from '../constants/filterName';
const pageName = require('../../common/enums/pageName');

import {FormatUtils} from '../../common/lib/FormatUtils';

import {UniversitySubHeader} from './UniversitySubHeader';
import {UniversityFooter} from './UniversityFooter';
import {ProgramFilterPanel} from '../lib/ProgramFilterPanel';
import {programsView} from './programsView';

import {AppConfig} from '../../common/types/layout';
import {BackendUser} from '../../user/types/user';

import {
    lSearchUniversity
} from '../../../blocks/n-university/l-search_university/params';


type Params = {
    data: Data;
    config: AppConfig;
    requestData: {
        user: BackendUser;
        csrf: string;
        query: any;
    }
};

type Data = {
    filtersData: any;
    searchParams: SearchParams;
    favorites: Array<{string: any}>;
};

type SearchParams = {
    cities: number[];
    ege: number[];
    payType: number[];
    maxPassScore: number[];
    maxPrice: number[];
    majors: number[];
    features: number[];
    page: number;
    sortType: number;
    name: string;
};

type FilterPanelParams = {
    filtersData: any;
    searchParams: SearchParams;
    enabledFilters: string[];
};

class SearchView extends LayoutView {
    protected params: lSearchUniversity.Params;

    constructor() {
        super();

        this.views.subHeader = UniversitySubHeader;
        this.views.footer = UniversityFooter;

        this.entityType = entityType.UNIVERSITY;
        this.pageName = pageName.SEARCH;

        this.seo = {
            metaTitle: 'Поиск программ, факультетов и специальностей на Меле',
            metaDescription: 'Узнай, в какой вуз России ты можешь поступить ' +
                'с твоими баллами ЕГЭ. Выбери вуз, который подходит тебе, ' +
                'и подпишись на новости о днях открытых дверей и публикации ' +
                'списков зачисления!'
        };

        this.subHeader = {
            isLogoRedirect: true,
            isSearchRedirect: false,
            isBottomLine: true
        };

        this.openGraph = {};
    }

    public initSearchParams(params): SearchParams {
        const formatUtils = new FormatUtils();

        return {
            cities: formatUtils.transformToArray(params.cities),
            ege: formatUtils.transformToArray(params.ege),
            payType: formatUtils.transformToArray(params.payType),
            maxPassScore: formatUtils.transformToArray(params.maxPassScore),
            majors: formatUtils.transformToArray(params.majors),
            maxPrice: formatUtils.transformToArray(params.maxPrice),
            features: formatUtils.transformToArray(
                params.features
            ),
            page: params.page || 0,
            sortType: params.sortType || 0,
            name: params.name
        };
    }

    protected setParams(params: Params) {
        super.setParams(params);

        this.setResultsList_();
        this.setFilterPanels_(params.data);
        this.setSearchParams_(params.data.searchParams);
    }

    private setResultsList_() {
        const programs = programsView.list();

        this.params.data.resultsList = {
            sort: {
                items: [{
                        'label': 'Проще поступить',
                        'value': 0
                    }, {
                        'label': 'Дешевле',
                        'value': 1
                    }, {
                        'label': 'Отзывы',
                        'value': 2
                    }
                ]
            },
            headerText: [
                {
                    text: 'Мы нашли'
                },
                {
                    number: 123,
                    text: {
                        nom: 'програму',
                        gen: 'программы',
                        plu: 'программ'
                    },
                    select: 'number'
                }
            ],
            entityList: {
                items: programs,
                itemType: 'smItemUniversity',
                itemConfig: {
                    enableCover: true
                }
            }
        };
    }

    private setFilterPanels_(data: Data) {
        const ege = [
            {
                id: 1,
                name: 'Математика (профильная)'
            }, {
                id: 2,
                name: 'Английский язык'
            }, {
                id: 3,
                name: 'История'
            }
        ];

        const filtersData = {
            cities: [
                {
                    id: 1,
                    name: 'Москва'
                }, {
                    id: 2,
                    name: 'Санкт-Петербург'
                }
            ],
            ege: ege,
            maxPassScore: ege,
            majors: [
                {
                    id: 1,
                    name: 'Менеджмент'
                }, {
                    id: 2,
                    name: 'Экономика'
                }, {
                    id: 3,
                    name: 'Юриспруденция'
                }, {
                    id: 4,
                    name: 'Медицина'
                }
            ]
        };
        const mainPanelParams: FilterPanelParams = {
            searchParams: data.searchParams,
            filtersData: data.filtersData || filtersData,
            enabledFilters: [
                filterName.CITIES,
                filterName.EGE,
                filterName.PAY_TYPE
            ]
        };

        const filterPanel = new ProgramFilterPanel();
        this.params.data.filterPanel = filterPanel.render(mainPanelParams);

        const dependentPanelParams: FilterPanelParams = {
            searchParams: data.searchParams,
            filtersData: data.filtersData || filtersData,
            enabledFilters: [
                filterName.MAX_PASS_SCORE,
                filterName.MAJORS,
                filterName.MAX_PRICE,
                filterName.FEATURES
            ]
        };

        const dependentfilterPanel = new ProgramFilterPanel();
        this.params.data.dependentFilterPanel = dependentfilterPanel.render(
            dependentPanelParams
        );
    }

    private setSearchParams_(searchParams: SearchParams) {
        this.params.data.searchParams = searchParams;
    }
}

export const searchView = new SearchView();
