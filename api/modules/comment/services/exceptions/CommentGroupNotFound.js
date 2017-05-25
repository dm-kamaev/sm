"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class CommentGroupNotFound extends Exception {
    constructor(commentGroupId) {
        super(`Comment group with id = ${commentGroupId} not found`);
        this.name = 'CommentGroupNotFoundException';
    }
}
exports.CommentGroupNotFound = CommentGroupNotFound;
