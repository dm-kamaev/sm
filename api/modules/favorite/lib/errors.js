'use strict';


class FavoriteEntryNotFound extends Error {
    constructor() {
        super('Favorite entry not found');
    }
}


exports.FavoriteEntryNotFound = FavoriteEntryNotFound;
