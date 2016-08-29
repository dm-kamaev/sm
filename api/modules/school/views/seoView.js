'use strict';

const searchView = require('./searchView');

var seoView = {};


/**
 * Return search parameters from given seoSchoolList instance
 * @param {models.SeoSchoolList} seoSchoolList
 * @return {{
 *     searchText: string,
 *     searchParams: {
 *         name: string,
 *         schoolType: Array<number>,
 *         classes: Array<number>,
 *         gia: Array<number>,
 *         ege: Array<number>,
 *         olimp: Array<number>,
 *         metroId: ?number,
 *         areaId: ?number,
 *         districtId: ?number,
 *         sortType: ?number,
 *         page: number
 *     }
 * }}
 */
seoView.searchParams = function(seoSchoolList) {
    var storedParams = JSON.parse(seoSchoolList.searchParameters);

    return {
        searchParams: searchView.params(storedParams),
        searchText: storedParams.name || ''
    };
};


/**
 * Return seo data from given seoSchoolList instance
 * @param {models.seoSchoolList} seoSchoolList
 * @return {{
 *     metaTitle: ?string,
 *     metaDescription: ?string,
 *     title: ?string,
 *     description: ?string,
 *     textLeft: ?Array<string>,
 *     textRight : ?Array<string>
 * }}
 */
seoView.seoListData = function(seoSchoolList) {
    var text = seoSchoolList.text || [];

    return {
        metaTitle: seoSchoolList.seoTitle,
        metaDescription: seoSchoolList.seoDescription,
        title: seoSchoolList.title,
        description: text[0],
        textLeft: splitTextForParagraphs(text[1]),
        textRight: splitTextForParagraphs(text[2])
    };
};


/**
 * Split given text to array of paragraphs
 * @param {?string} text
 * @return {?Array<string>}
 */
var splitTextForParagraphs = function(text) {
    return text ? text.split('\n') : null;
};


/**
 * @param {{
 *     entityType: string,
 *     user: {
 *         firstName: (string|undefined),
 *         lastName: (string|undefined)
 *     },
 *     authSocialLinks: {
 *        vk: (string|undefined),
 *        fb: (string|undefined)
 *     },
 *     catalog: {
 *         header: string,
 *         tabs: Array<{
 *             title: string,
 *             links: Array<{
 *                 name: string,
 *                 url: string
 *             }>
 *         }>
 *     }
 * }} data
 * @return {Object}
 */
seoView.catalog = function(data) {
    return {
        type: data.entityType,
        seo: {
            metaTitle: 'Каталог школ Москвы'
        },
        subHeader: {
            logo: {
                imgUrl: '/images/n-common/b-sm-subheader/school-logo.svg'
            },
            links: {
                nameL: 'Все школы Москвы',
                nameM: 'Все школы',
                url: '/'
            },
            search: {
                placeholder: 'Номер школы, метро, район'
            },
            user: data.user,
            favorites: []
        },
        authSocialLinks: data.authSocialLinks,
        user: data.user,
        catalog: {
            header: 'Каталог школ Москвы',
            tabs: getCatalogData(data)
        }
    };
};


/**
 * @param {{
 *     links: Array<{
 *         name: string,
 *         url: string
 *     }>
 * }} data
 * @return {Object}
 */
var getCatalogData = function(data) {
    return [
        {
            title: 'Округа',
            links: [{
                name: '123'
            }]
        },
        {
            title: 'Типы школ',
            links: [
                {
                    name: '2345'
                }
            ]
        }
    ];
};

module.exports = seoView;
