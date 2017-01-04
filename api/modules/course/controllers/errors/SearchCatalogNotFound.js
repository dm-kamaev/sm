'use strict';

module.exports = class SearchCatalogNotFound extends Error {
    /**
     * @param {Number} id
     */
    constructor(id) {
        super();
        this.status = 404;
        this.response = [{
            code: 'SearchCatalogNotFound',
            message: `Can't find link from search-catalog with id: "${id}"`
        }];
    }
};
