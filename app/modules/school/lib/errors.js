'use strict';

class SchoolNotFoundError extends Error {
    constructor() {
        super('School not found');

        this.code = 404;
    }
}


exports.SchoolNotFoundError = SchoolNotFoundError;
