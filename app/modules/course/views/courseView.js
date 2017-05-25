"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview View for course entity
 */
const config = require('../../../config/config.json');
const protocol = config.protocol;
const host = config.courses.host;
class CourseView {
    getLink(url) {
        return `${protocol}://${host}/${url}`;
    }
}
exports.courseView = new CourseView();
