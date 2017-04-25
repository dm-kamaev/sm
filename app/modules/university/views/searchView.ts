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
import {BackendProgramResults} from '../types/program';

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
            egeSubjects: formatUtils.transformToArray(params.egeSubjects),
            payType: formatUtils.transformToArray(params.payType),
            egeResults: formatUtils.transformToArray(params.egeResults),
            majors: formatUtils.transformToArray(params.majors),
            maxPrice: formatUtils.transformToArray(params.maxPrice),
            features: formatUtils.transformToArray(params.features),
            page: params.page || 0,
            sortType: params.sortType || 0
        };
    }

    public generateHeaderText(programCount: number, universityCount: number) {
        return [
            {
                text: 'Мы нашли'
            },
            {
                number: programCount,
                text: {
                    nom: 'програму',
                    gen: 'программы',
                    plu: 'программ'
                },
                select: 'number'
            },
            {
                text: 'обучения в'
            },
            {
                number: universityCount,
                text: {
                    nom: 'вузе',
                    gen: 'вузах',
                    plu: 'вузов'
                },
                select: 'number'
            },
        ];
    }

    protected setParams(params: RenderParams) {
        super.setParams(params);

        const searchParams = this.initSearchParams(params);
        this.setResultsList_(params.data.resultsList);
        this.setFilterPanels_(params.data, searchParams);
        this.setSearchParams_(searchParams);
    }

    private setResultsList_(resultsList: BackendProgramResults) {
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
            headerText: this.generateHeaderText(
                resultsList.programCount,
                resultsList.universityCount
            ),
            entityList: {
                items: programsView.list(resultsList.programs),
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

        const mainPanelParams: FilterPanelParams = {
            searchParams: searchParams,
            filtersData: {
                cities: data.cities,
                egeSubjects: data.egeExams,
                citiesCount: data.cities.length
            },
            enabledFilters: [
                filterName.CITIES,
                filterName.EGE_SUBJECTS,
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
            filtersData: {
                egeResults: data.egeExams,
                majors: data.majors.programMajor,
                majorsCount: data.majors.count
            },
            enabledFilters: [
                filterName.EGE_RESULTS,
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
