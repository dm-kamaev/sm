/**
 * @fileoverview Exception, which occurs when user try to comment program
 * which he already commented
 */
import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class UserAlreadyCommentedProgram extends Exception {
    public readonly name: string;

    constructor(programId: number, userId: number) {
        const message = `User with id = ${userId}` +
            ` already place comment to program with id = ${programId}`;
        super(message);

        this.name = 'UserAlreadyCommentedProgramException';
    }
}

export {UserAlreadyCommentedProgram};
