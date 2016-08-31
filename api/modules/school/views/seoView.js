'use strict';

const lodash = require('lodash');

const searchView = require('./searchView');
const seoListType = require('../enums/seoListType');

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
 * Returns lists for catalog
 * @param {Array<models.SeoSchoolList>} seoSchoolList
 * @return {Array<{
 *     label: string,
 *     content: Array<{
 *         name: string,
 *         url: string
 *     }>
 * }>}
 */
seoView.listsCatalog = function(seoSchoolList) {
    var listTypes = [
        seoListType.LYCEUM,
        seoListType.GYMNASIUM,
        seoListType.CADET_SCHOOL,
        seoListType.EDUCATIONAL_CENTER
    ];

    var filteredList = seoView.filterDataByType(listTypes, seoSchoolList);
    var listsCatalog = seoView.transformCatalogData(listTypes, filteredList);

    return listsCatalog;
};


/**
 * Return data for catalog page
 * @param {{
 *     entityType: string,
 *     user: {
 *         firstName: (string|undefined),
 *         lastName: (string|undefined)
 *     },
 *     favorites: ?Array<Object>,
 *     authSocialLinks: {
 *        vk: (string|undefined),
 *        fb: (string|undefined)
 *     },
 *     listsCatalog: Array<{
 *         label: string,
 *         content: Array<{
 *             name: string,
 *             url: string
 *         }>
 *     }>
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
            favorites: {
                schools: data.favorites
            }
        },
        authSocialLinks: data.authSocialLinks,
        user: data.user,
        catalog: {
            header: 'Каталог школ Москвы',
            tabs: data.listsCatalog
        }
    };
};


/**
 * Returns filtered data by type
 * @param {Array<string>} listTypes
 * @param {Array<models.SeoSchoolList>} seoSchoolList
 * @return {Array<models.SeoSchoolList>}
 */
seoView.filterDataByType = function(listTypes, seoSchoolList) {
    return seoSchoolList.filter(item =>
        !(listTypes.some(type => type == item.listType) && !item.geoType)
    );
};


/**
 * Returns transformed catalog of lists
 * @param {Array<string>} listTypes
 * @param {Array<models.SeoSchoolList>} seoSchoolList
 * @return {Array<{
 *     label: string,
 *     content: Array<{
 *         name: string,
 *         url: string
 *     }>
 * }>}
 */
seoView.transformCatalogData = function(listTypes, seoSchoolList) {
    var groupedLists = seoView.groupListsByEducationType(
        listTypes,
        seoSchoolList
    );
    var transformedLists = seoView.transformListItems(groupedLists);

    return seoView.transformTolistsCatalog(transformedLists);
};


/**
 * Return grouped lists catalog by education type
 * @param {Array<string>} listTypes
 * @param {Array<models.SeoSchoolList>} seoSchoolList
 * @return {Object<string, Array<models.SeoSchoolList>>}
 */
seoView.groupListsByEducationType = function(listTypes, seoSchoolList) {
    seoSchoolList.map(item => {
        item.type = listTypes.some(type => type == item.listType) ?
            item.listType :
            'schools';
    });

    return lodash.groupBy(seoSchoolList, 'type');
};


/**
 * Return data link (transformed items)
 * @param {Object<string, Array<models.SeoSchoolList>>} listsByType
 * @return {Object<string, Array<{
 *     name: string,
 *     url: string
 * }>>}
 */
seoView.transformListItems = function(listsByType) {
    var listsCatalog = {};

    for (var type in listsByType) {
        listsCatalog[type] = listsByType[type].map(item => {
            return seoView.item(item);
        });
    }

    return listsCatalog;
};


/**
 * Return transformed lists Catalog
 * @param {models.SeoSchoolList} listsCatalogItems
 * @return {Array<{
 *     label: string,
 *     content: Array<{
 *         name: string,
 *         url: string
 *     }>
 * }>}
 */
seoView.transformTolistsCatalog = function(listsCatalogItems) {
    return [
        seoView.list(
            'Все школы',
            listsCatalogItems['schools']
        ),
        seoView.list(
            'Гимназии',
            listsCatalogItems['gimnazii']
        ),
        seoView.list(
            'Лицеи',
            listsCatalogItems['licei']
        ),
        seoView.list(
            'Кадетские',
            listsCatalogItems['kadetskiye']
        ),
        seoView.list(
            'Центры образования',
            listsCatalogItems['centry-obrazovaniya']
        )
    ];
};


/**
 * Return list items with header
 * @param {string} header
 * @param {string} items
 * @return {{
 *     label: string,
 *     content: Array<{
 *         name: string,
 *         url: string
 *     }>
 * }}
 */
seoView.list = function(header, items) {
    return {
        label: header,
        content: items
    };
};


/**
 * Return data for link catalog
 * @param {models.SeoSchoolList} item
 * @return {{
 *     name: string,
 *     url: string
 * }}
 */
seoView.item = function(item) {
    return {
        name: seoView.title(item.title),
        url: seoView.url(item.listType, item.geoType)
    };
};


/**
 * Return item title
 * @param {string} title
 * @return {string}
 */
seoView.title = function(title) {
    return title.replace(' Москвы', '');
};


/**
 * Return url for item
 * @param {string} listType
 * @param {string=} opt_geoType
 * @return {string}
 */
seoView.url = function(listType, opt_geoType) {
    var geoType = opt_geoType ? ('/' + opt_geoType) : '';
    return '/school/' + listType + geoType;
};

module.exports = seoView;
