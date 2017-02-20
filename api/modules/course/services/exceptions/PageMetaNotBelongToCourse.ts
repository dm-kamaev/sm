/**
 * @fieoverview Exception, which occurs when given id of page meta
 * not associated to given course
 */

import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class PageMetaNotBelongToCourse extends Exception {
    public readonly name: string;

    constructor(courseId: number, pageMetaId: number) {
        const message = `Page meta with id = ${pageMetaId} not associated ` +
            ` with course with id = ${courseId}`;
        super(message);

        this.name = 'PageMetaNotBelongsToCourse';
    }
}

export {PageMetaNotBelongToCourse};
