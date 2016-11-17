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
 * @param {models.courseCategory} courseCategory
 * @param {models.seoCourseList=} opt_seoData
 * @return {{
 *     id: number,
 *     name: string,
 *     filters: Array<string>,
 *     isActive: boolean,
 *     tabTitle: string,
 *     metaDescription: string,
 *     openGraphTitle: string,
 *     openGraphDescription: string,
 *     listTitle: string,
 *     searchDescription: string,
 *     seoText1: string,
 *     seoText2: string,
 *     created_at: string,
 *     updated_at: string
 * }}
 */
courseCategoryView.joinSeoData = function(courseCategory, opt_seoData) {
    let seoData = opt_seoData || {};
    return {
        id: courseCategory.id || null,
        name: courseCategory.name || null,
        filters: courseCategory.filters || null,
        isActive: courseCategory.isActive || null,
        tabTitle: seoData.tabTitle || null,
        metaDescription: seoData.metaDescription || null,
        openGraphTitle: seoData.openGraphTitle || null,
        listTitle: seoData.listTitle || null,
        searchDescription: seoData.text ? seoData.text[0] : null,
        seoText1: seoData.text ? seoData.text[1] : null,
        seoText2: seoData.text ? seoData.text[2] : null,
        createdAt: courseCategory.createdAt || null,
        updatedAt: courseCategory.updatedAt || null
    };
};

module.exports = courseCategoryView;
