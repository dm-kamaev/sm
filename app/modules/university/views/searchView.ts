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

import {
    BackendData,
    RenderParams,
    QueryParams
} from '../types/programSearchLayout';

import {
    lSearchUniversity
} from '../../../blocks/n-university/l-search_university/params';

type FilterPanelParams = {
    filtersData: any;
    searchParams: lSearchUniversity.Params.SearchParams;
    enabledFilters: string[];
    theme?: string;
    button?: {
        content: string;
        theme?: string;
        borderRoundSize?: string;
    };
    isMainPanel?: boolean;
    isDependentPanel?: boolean;
};

class SearchView extends LayoutView {
    protected params: lSearchUniversity.Params;

    constructor() {
        super(entityType.PROGRAM);

        this.views.subHeader = UniversitySubHeader;
        this.views.footer = UniversityFooter;

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

    public initSearchParams(
            data: RenderParams): lSearchUniversity.Params.SearchParams {
        const formatUtils = new FormatUtils();
        const params = data.requestData.query;

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
            sortType: params.sortType || 0
        };
    }

    protected setParams(params: RenderParams) {
        super.setParams(params);

        const searchParams = this.initSearchParams(params);
        this.setResultsList_();
        this.setFilterPanels_(params.data, searchParams);
        this.setSearchParams_(searchParams);
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

    private setFilterPanels_(
            data: BackendData,
            searchParams: lSearchUniversity.Params.SearchParams) {
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
            searchParams: searchParams,
            filtersData: data.filtersData || filtersData,
            enabledFilters: [
                filterName.CITIES,
                filterName.EGE,
                filterName.PAY_TYPE
            ],
            theme: 'neptune',
            button: {
                content: 'Найти',
                theme: 'neptune-reverse',
                borderRoundSize: 'xl'
            },
            isMainPanel: true
        };

        const filterPanel = new ProgramFilterPanel();
        this.params.data.filterPanel = filterPanel.render(mainPanelParams);

        const dependentPanelParams: FilterPanelParams = {
            searchParams: searchParams,
            filtersData: data.filtersData || filtersData,
            enabledFilters: [
                filterName.MAX_PASS_SCORE,
                filterName.MAJORS,
                filterName.MAX_PRICE,
                filterName.FEATURES
            ],
            theme: 'neptune',
            button: {
                content: 'Найти',
                theme: 'neptune-reverse',
                borderRoundSize: 'xl'
            },
            isDependentPanel: true
        };

        const dependentfilterPanel = new ProgramFilterPanel();
        this.params.data.dependentFilterPanel = dependentfilterPanel.render(
            dependentPanelParams
        );
    }

    private setSearchParams_(
            searchParams: lSearchUniversity.Params.SearchParams) {
        this.params.data.searchParams = searchParams;
    }
}

export const searchView = new SearchView();
