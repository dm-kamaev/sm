"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview View for search page
 */
const Layout_1 = require("../../common/lib/Layout");
const entityType_1 = require("../../common/enums/entityType");
const filterName_1 = require("../constants/filterName");
const pageName = require('../../common/enums/pageName');
const UniversitySubHeader_1 = require("./UniversitySubHeader");
const UniversityFooter_1 = require("./UniversityFooter");
const ProgramFilterPanel_1 = require("../lib/ProgramFilterPanel");
const programView_1 = require("./programView");
class ProgramRenderSearchView extends Layout_1.LayoutView {
    constructor() {
        super(entityType_1.entityType.PROGRAM);
        this.views.subHeader = UniversitySubHeader_1.UniversitySubHeader;
        this.views.footer = UniversityFooter_1.UniversityFooter;
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
    render(params) {
        return super.render(params);
    }
    generateHeaderText(programCount, universityCount) {
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
    setParams(params) {
        super.setParams(params);
        const searchParams = params.data.searchParams;
        this.setResultsList_(params.data);
        this.setFilterPanels_(params.data, searchParams);
        this.setSearchParams_(searchParams);
        this.setApi_();
    }
    getParams() {
        return this.params;
    }
    setResultsList_(data) {
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
            headerText: this.generateHeaderText(resultsList.programCount, resultsList.universityCount),
            title: 'Поиск программ обучения',
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
                items: programView_1.programView.list(resultsList.programs),
                itemType: 'smItemUniversity',
                itemConfig: {
                    enableCover: true
                }
            }
        };
    }
    setFilterPanels_(data, searchParams) {
        const mainPanelParams = {
            searchParams: searchParams,
            filtersData: {
                cities: data.cities,
                egeSubjects: data.egeExams,
                citiesCount: data.cities.length
            },
            enabledFilters: [
                filterName_1.filterName.CITIES,
                filterName_1.filterName.EGE_SUBJECTS,
                filterName_1.filterName.PAY_TYPE
            ],
            theme: 'neptune',
            button: {
                defaultText: 'Найти',
                theme: 'neptune-reverse',
                borderRoundSize: 'xl'
            },
            isMainPanel: true
        };
        const filterPanel = new ProgramFilterPanel_1.ProgramFilterPanel();
        this.params.data.filterPanel = filterPanel.render(mainPanelParams);
        const dependentPanelParams = {
            searchParams: searchParams,
            filtersData: {
                egeResults: data.egeExams,
                majors: data.majors.programMajor,
                majorsCount: data.majors.count
            },
            enabledFilters: [
                filterName_1.filterName.EGE_RESULTS,
                filterName_1.filterName.MAJORS,
                filterName_1.filterName.MAX_PRICE,
                filterName_1.filterName.FEATURES
            ],
            theme: 'neptune',
            button: {
                defaultText: 'Найти',
                theme: 'neptune-reverse',
                borderRoundSize: 'xl'
            },
            isDependentPanel: true
        };
        const dependentfilterPanel = new ProgramFilterPanel_1.ProgramFilterPanel();
        this.params.data.dependentFilterPanel = dependentfilterPanel.render(dependentPanelParams);
    }
    setSearchParams_(searchParams) {
        this.params.data.searchParams = searchParams;
    }
    setApi_() {
        this.params.data.api = this.api;
    }
}
exports.programRenderSearchView = new ProgramRenderSearchView();
