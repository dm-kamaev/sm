/**
 * @fileOverview Exception, which occurs when university comment not found
 */
import {ServiceException} from '../../../../../api/components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class ProgramCommentNotFound extends Exception {
    public readonly name: string;

    constructor() {
        super(`Program comment with given id not found`);

        this.name = 'ProgramCommentNotFoundException';
    }
}

export {ProgramCommentNotFound};
