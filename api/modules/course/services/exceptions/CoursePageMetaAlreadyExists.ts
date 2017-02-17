/**
 * @fieoverview Exception, which occurs when given id of page meta
 * not associated to given course
 */

import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class CoursePageMetaAlreadyExists extends Exception {
    public readonly name: string;

    constructor(courseId: number) {
        const message = `Course with id = ${courseId} already have an` +
            ` page meta information`
        super(message);

        this.name = 'CoursePageMetaAlreadyExists';
    }
}

export {CoursePageMetaAlreadyExists};
