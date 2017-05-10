/**
 * @fileoverview View for search page
 */
import {LayoutView} from '../../common/lib/Layout';

import {entityType} from '../../common/enums/entityType';
const pageName = require('../../common/enums/pageName');

import {UniversitySubHeader} from './UniversitySubHeader';
import {UniversityFooter} from './UniversityFooter';

import {
    RenderParams,
    BackendData
} from '../types/universityHomeLayout';

import {
    lHomeUniversity
} from '../../../blocks/n-university/l-home-university/params';


class UniversityRenderHomeView extends LayoutView {
    protected params: lHomeUniversity.Params;

    constructor() {
        super(entityType.UNIVERSITY);

        this.views.subHeader = UniversitySubHeader;
        this.views.footer = UniversityFooter;

        this.pageName = pageName.HOME;

        this.seo = {
            metaTitle: 'Поиск программ, факультетов и специальностей на Меле',
            metaDescription: 'Узнай, в какой вуз России ты можешь поступить ' +
                'с твоими баллами ЕГЭ. Выбери вуз, который подходит тебе, ' +
                'и подпишись на новости о днях открытых дверей и публикации ' +
                'списков зачисления!'
        };

        this.subHeader = {
            isLogoRedirect: false,
            isSearchRedirect: true,
            isBottomLine: true
        };
    }

    protected setParams(params: RenderParams) {
        super.setParams(params);

        this.setSearchPanel_(params.data);
        this.setPopularUniversities_();
        this.setBanner_();
        this.setArticles_();
    }

    private setSearchPanel_(data: BackendData) {
        this.params.data.searchPanel = {
            data: {
                title: 'Удобный подбор программ бакалавриата',
                searchCity: {
                    placeholder: 'Город или название региона',
                    sourceUrl: '/program/geosearch'
                },
                payType: {
                    content: [
                        {
                            label: 'Платное',
                            value: 0
                        }, {
                            label: 'Бюджетное',
                            value: 1
                        }, {
                            label: 'Платное и бюджетное',
                            value: 2
                        }
                    ],
                    contentConfig: null
                },
                ege: {
                    name: 'ege',
                    header: {
                        title: 'Укажите ЕГЭ по выбору'
                    },
                    options: [
                        {
                            label: 'Русский язык',
                            value: 0
                        }, {
                            label: 'Литература',
                            value: 1
                        }, {
                            label: 'Математика (базовая)',
                            value: 2
                        }, {
                            label: 'Математика (профильн.)',
                            value: 3
                        }
                    ]
                },
                button: {
                    content: 'Подобрать',
                    theme: 'noon',
                    borderRoundSize: 'xl'
                }
            },
            config: {}
        };
    };

    private setPopularUniversities_() {
        this.params.data.populars = {};
    }

    private setBanner_() {
        const imgDirectory = '/static/images/n-university/l-home-university/' +
            'img/';

        this.params.data.banner = {
            imgUrl: {
                default: imgDirectory + 'banner-ege.jpg',
                sizeXS: imgDirectory + 'banner-ege_size_xs.jpg'
            },
            linkUrl: '/'
        };
    }

    private setArticles_() {
        this.params.data.articles = {};
    }
}

export const universityRenderHomeView = new UniversityRenderHomeView();

