/**
 * @fileoverview View for search page
 */

import {LayoutView} from '../../common/lib/Layout';

import {entityType} from '../../common/enums/entityType';
const pageName = require('../../common/enums/pageName');
const LinksGenerator = require('../../common/lib/LinksGenerator');
const config = require('../../../config/config.json');

import {UniversitySubHeader} from './UniversitySubHeader';
import {UniversityFooter} from './UniversityFooter';

import {Subject} from '../types/egeExam';
import {
    RenderParams,
    BackendData
} from '../types/universityHomeLayout';
import {BackendUniversity} from '../types/university';


import {
    lHomeUniversity
} from '../../../blocks/n-university/l-home-university/params';

// tslint:disable-next-line:max-line-length
import {bSearchPanel} from '../../../blocks/n-university/l-home-university/b-search-panel-university/params';
import {
    bSmInformationCard
} from '../../../blocks/n-common/b-sm-information-card/params';



type Ege = {
    label: string;
    value: number;
};

const linksGenerator = new LinksGenerator(config);
const searchUrl = linksGenerator.links.university + '/program/search';

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
        this.setPopularUniversities_(params.data.populars);
        this.setBanner_();
        this.setArticles_();
    }

    private setSearchPanel_(data: BackendData) {
        const params: bSearchPanel.Params = {
            data: {
                title: 'Удобный подбор программ бакалавриата',
                urlRedirect: '/program/search',
                searchCity: {
                    placeholder: 'Город или название региона',
                    sourceUrl: '/program/geosearch',
                    icon: {
                        name: 'location_black',
                        type: 'svg',
                        position: 'left'
                    },
                    theme: 'neptune',
                    suggestList: {
                        theme: 'neptune',
                        color: 'blue',
                        isShifted: true
                    }
                },
                payType: {
                    content: [
                        {
                            label: 'Платное и бюджетное',
                            value: [0, 1],
                            isSelected: true
                        }, {
                            label: 'Только платное',
                            value: 1
                        }, {
                            label: 'Только бюджетное',
                            value: 0
                        }
                    ]
                },
                ege: {
                    name: 'ege',
                    header: {
                        title: 'Укажите минимум 3 предмета ЕГЭ по выбору'
                    },
                    options: this.transformEge(data.ege)
                },
                button: {
                    content: 'Подобрать',
                    theme: 'noon',
                    borderRoundSize: 'xl',
                    size: 'm'
                }
            },
            config: {
                optionsTheme: 'zebra',
                checkboxIcon: {
                    check: 'checked-blue',
                    uncheck: 'unchecked-blue'
                }
            }
        };
        this.params.data.searchPanel = params;
    }

    private setPopularUniversities_(populars: BackendUniversity[]) {
        this.params.data.populars = {
            header: 'Популярные вузы',
            data: {
                countItemsPerPage: 4,
                items: populars.map(
                    university => this.getPopularUniversityItem_(university)
                ),
                itemType: 'smInformationCard'
            }
        };
    }

    private getPopularUniversityItem_(
            university: BackendUniversity
    ): bSmInformationCard.Params.Data {
        return {
            id: university.id,
            type: entityType.UNIVERSITY,
            name: {
                data: {
                    content: university.abbreviation
                },
                config: {
                    theme: 'dark',
                    target: '_blank',
                    size: '6xl'
                }
            },
            link: {
                data: {
                    content: university.city.name,
                    url: `${searchUrl}?cities=${university.city.id}`
                },
                config: {
                    size: 'xl'
                }
            },
            logo: {
                url: university.imageUrl
            }
        };
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

    private transformEge(data: Subject[]): Ege[] {
        return data.map(item => {
            return {
                label: item.displayName,
                value: item.id
            };
        });
    }
}

export const universityRenderHomeView = new UniversityRenderHomeView();

