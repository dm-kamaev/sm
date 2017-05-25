"use strict";
/**
 * @fileoverview View for search page
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Layout_1 = require("../../common/lib/Layout");
const entityType_1 = require("../../common/enums/entityType");
const pageName = require('../../common/enums/pageName');
const LinksGenerator = require('../../common/lib/LinksGenerator');
const config = require('../../../config/config.json');
const UniversitySubHeader_1 = require("./UniversitySubHeader");
const UniversityFooter_1 = require("./UniversityFooter");
const UniversityImageSize_1 = require("../constants/UniversityImageSize");
const linksGenerator = new LinksGenerator(config);
const searchUrl = linksGenerator.links.university + '/program/search';
const IMAGE_WIDTH_TAG = '{width}';
class UniversityRenderHomeView extends Layout_1.LayoutView {
    constructor() {
        super(entityType_1.entityType.UNIVERSITY);
        this.views.subHeader = UniversitySubHeader_1.UniversitySubHeader;
        this.views.footer = UniversityFooter_1.UniversityFooter;
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
    setParams(params) {
        super.setParams(params);
        this.setSearchPanel_(params.data);
        this.setPopularUniversities_(params.data.populars);
        this.setBanner_();
        this.setArticles_();
    }
    setSearchPanel_(data) {
        const params = {
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
    setPopularUniversities_(populars) {
        this.params.data.populars = populars.length ? {
            header: 'Популярные вузы',
            data: {
                countItemsPerPage: 4,
                items: populars.map(university => this.getPopularUniversityItem_(university)),
                itemType: 'smInformationCard'
            }
        } : null;
    }
    getPopularUniversityItem_(university) {
        const imageUrl = university.imageUrl ?
            university.imageUrl.replace(IMAGE_WIDTH_TAG, UniversityImageSize_1.UniversityImageSize.DEFAULT[0].toString()) : null;
        return {
            id: university.id,
            type: entityType_1.entityType.UNIVERSITY,
            name: university.abbreviation,
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
                url: imageUrl
            }
        };
    }
    setBanner_() {
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
    setArticles_() {
        this.params.data.articles = {};
    }
    transformEge(data) {
        return data.map(item => {
            return {
                label: item.displayName,
                value: item.id
            };
        });
    }
}
exports.universityRenderHomeView = new UniversityRenderHomeView();
