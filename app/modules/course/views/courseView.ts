/**
 * @fileoverview View for course entity
 */
const config = require('../../../config/config.json');

const protocol = config.protocol;
const host = config.courses.host;

class CourseView {
    public getLink(url: string): string {
        return `${protocol}://${host}/${url}`;
    }
}

export const courseView = new CourseView();
