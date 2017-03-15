/**
 * @fileOverview Exception, which occurs when university comment not found
 */
import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class ProgramCommentNotFound extends Exception {
    public readonly name: string;

    constructor(universityCommentId: number) {
        super(`Program comment with id = ${universityCommentId} not found`);

        this.name = 'ProgramCommentNotFoundException';
    }
}

export {ProgramCommentNotFound};
