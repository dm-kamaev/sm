/**
 * @fileOverview Exception, which occurs when user try to make some actions over
 * comment which not associated with program with given id
 */
import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class CommentNotBelongsToProgram extends Exception {
    public readonly name: string;

    constructor(programId: number, commentId: number) {
        const message = `Program comment with id = ${commentId}` +
            ` not belongs to program with id = ${programId}`;
        super(message);

        this.name = 'CommentNotBelongsToProgramException';
    }
}

export {CommentNotBelongsToProgram};
