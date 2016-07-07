'use strict';

const searchView = require('./searchView');

var schoolSeoListView = {};

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
schoolSeoListView.searchParams = function(seoSchoolList) {
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
schoolSeoListView.seoData = function(seoSchoolList) {
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
 * @param {string} text
 * @return {Array<string>}
 */
var splitTextForParagraphs = function(text) {
    return text.split('\n');
};

module.exports = schoolSeoListView;
