"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class ProfileNotFound extends Exception {
    constructor(profileId) {
        super(`Profile with id = ${profileId} not found`);
        this.name = 'ProfileNotFoundException';
    }
}
exports.ProfileNotFound = ProfileNotFound;
