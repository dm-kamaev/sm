'use strict';

class FavoriteEntryNotFound extends Error {
    /**
     * Throw error
     */
    constructor() {
        super('Favorite entry not found');
    }
}


exports.FavoriteEntryNotFound = FavoriteEntryNotFound;
