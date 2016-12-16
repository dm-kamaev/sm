'use strict';

let courseCategoryView = {};

/**
 * @param  {Array<Category>} categories
 * @param  {Array<Page>} pages
 * @return {Array<{
 *     label: string,
 *     url: string
 * }>}
 */
courseCategoryView.listLinks = function(categories, pages) {
    return categories.map(category => {
        let page = pages.find(page => page.entityId == category.id);
        return {
            label: category.name,
            url: `/${page.alias}`
        };
    });
};

/**
 * Join seo data with course category into flat object
 * @param {{
 *     category: models.courseCategory,
 *     page: models.Page,
 *     seoData: (models.seoCourseList|undefined)
 * }} data
 * @return {{
 *     id: number,
 *     name: string,
 *     alias: string,
 *     filters: Array<string>,
 *     isActive: boolean,
 *     tabTitle: ?string,
 *     metaDescription: ?string,
 *     openGraphTitle: ?string,
 *     openGraphDescription: ?string,
 *     listTitle: ?string,
 *     searchDescription: ?string,
 *     seoText1: ?string,
 *     seoText2: ?string,
 *     createdAt: ?string,
 *     updatedAt: ?string
 * }}
 */
courseCategoryView.render = function(data) {
    let category = data.category,
        page = data.page,
        seoData = data.seoData || {};
    return {
        id: category.id,
        name: category.name,
        alias: page.alias,
        filters: category.filters || null,
        isActive: category.isActive || false,
        priceType: category.priceType,
        tabTitle: seoData.tabTitle || null,
        metaDescription: seoData.metaDescription || null,
        openGraphTitle: seoData.openGraphTitle || null,
        openGraphDescription: seoData.openGraphDescription || null,
        listTitle: seoData.listTitle || null,
        searchDescription: seoData.text ? seoData.text[0] : null,
        seoText1: seoData.text ? seoData.text[1] : null,
        seoText2: seoData.text ? seoData.text[2] : null,
        createdAt: category.createdAt || null,
        updatedAt: category.updatedAt || null
    };
};

module.exports = courseCategoryView;
