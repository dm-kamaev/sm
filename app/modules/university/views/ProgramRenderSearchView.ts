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
import {programView} from './programView';
import {programSearchView} from './programSearchView';

import {
    BackendData,
    RenderParams
} from '../types/programSearchLayout';
import {BackendProgramResults} from '../types/program';

import {
    lSearchUniversity
} from '../../../blocks/n-university/l-search_university/params';
import {
    bSearchResults
} from '../../../blocks/n-common/l-search/b-search-results/params';

type FilterPanelParams = {
    filtersData: any;
    searchParams: lSearchUniversity.Params.SearchParams;
    enabledFilters: string[];
    theme?: string;
    button?: {
        defaultText: string;
        theme?: string;
        borderRoundSize?: string;
    };
    isMainPanel?: boolean;
    isDependentPanel?: boolean;
};

class ProgramRenderSearchView extends LayoutView {
    protected params: lSearchUniversity.Params;
    protected api: {
        search: string;
    };

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

        this.openGraph = {
            title: this.seo.metaTitle,
            description: this.seo.metaDescription,
            image: '/static/images/n-clobl/i-layout/university_sharing.jpg',
            relapImage: '/static/images/n-university/relap.png'
        };

        this.api = {
            search: '/program/filtersearch'
        };
    }


    public render(params: RenderParams): lSearchUniversity.Params {
        return super.render(params) as lSearchUniversity.Params;
    }

    public generateHeaderText(
            programCount: number,
            universityCount: number
        ): bSearchResults.Params.HeaderTextEntry[] {
        return [
            {
                text: 'Мы нашли'
            },
            {
                number: programCount,
                text: {
                    nom: 'программу',
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
                    plu: 'вузах'
                },
                select: 'number'
            },
        ];
    }

    protected setParams(params: RenderParams) {
        super.setParams(params);
        const searchParams = params.data.searchParams;

        this.setResultsList_(params.data);
        this.setFilterPanels_(params.data, searchParams);
        this.setSearchParams_(searchParams);
        this.setApi_();
    }

    protected getParams(): lSearchUniversity.Params {
        return this.params;
    }

    private setResultsList_(data: BackendData) {
        const resultsList = data.resultsList;
        this.params.data.resultsList = {
            sort: {
                defaultOpenerText: 'Проще поступить',
                content: {
                    items: [
                        {
                            label: 'Проще поступить',
                            value: 0
                        }, {
                            label: 'Дешевле',
                            value: 1
                        }, {
                            label: 'Отзывы',
                            value: 2
                        }
                    ],
                    selectedItemId: data.searchParams.sortType
                }
            },
            headerText: this.generateHeaderText(
                resultsList.programCount,
                resultsList.universityCount
            ),
            title: 'Вузы Москвы',
            placeholder: {
                text: [
                    'Ничего страшного! Во-первых, в&nbsp;нашей базе есть ' +
                        'не&nbsp;все программы обучения, во-вторых, ' +
                        'мы&nbsp;ориентируемся на&nbsp;проходные  баллы ' +
                        'прошлого года, в&nbsp;этом году они могут ' +
                        'быть другими. Попробуйте изменить параметры ' +
                        'поиска и&nbsp;попробовать ещё раз.'
                ]
            },
            description: this.seo.metaDescription,
            countResults: resultsList.programCount,
            entityList: {
                items: programView.list(resultsList.programs),
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
                defaultText: 'Найти',
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
                defaultText: 'Найти',
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

    private setApi_() {
        this.params.data.api = this.api;
    }
}

export const programRenderSearchView = new ProgramRenderSearchView();

