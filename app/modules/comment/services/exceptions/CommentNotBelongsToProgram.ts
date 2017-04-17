/**
 * @fileOverview Exception, which occurs when user try to make some actions over
 * comment which not associated with program with given id
 */
import {ServiceException} from '../../../../../api/components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class CommentNotBelongsToProgram extends Exception {
    public readonly name: string;

    constructor() {
        const message = `Program comment with given id` +
            ` not belongs to program with given id`;
        super(message);

        this.name = 'CommentNotBelongsToProgramException';
    }
}

export {CommentNotBelongsToProgram};
