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

module.exports = courseCategoryView;
