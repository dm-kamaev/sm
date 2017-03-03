/**
 * @fileOverview Exception, which occurs when university comment not found
 */
import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class UniversityCommentNotFound extends Exception {
    public readonly name: string;

    constructor(universityCommentId: number) {
        super(`University comment with id = ${universityCommentId} not found`);

        this.name = 'universityCommentNotFound';
    }
}

export {UniversityCommentNotFound};
