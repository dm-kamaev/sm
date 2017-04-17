/**
 * @fileOverview Exception, which occurs when university comment not found
 */
import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class ProgramCommentNotFound extends Exception {
    public readonly name: string;

    constructor(programCommentId: number) {
        super(`Program comment with id = ${programCommentId} not found`);

        this.name = 'ProgramCommentNotFoundException';
    }
}

export {ProgramCommentNotFound};
