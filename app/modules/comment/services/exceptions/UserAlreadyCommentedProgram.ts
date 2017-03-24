/**
 * @fileoverview Exception, which occurs when user try to comment program
 * which he already commented
 */
import {ServiceException} from '../../../../../api/components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class UserAlreadyCommentedProgram extends Exception {
    public readonly name: string;

    constructor() {
        const message = `User with given id` +
            ` already place comment to program with given id`;
        super(message);

        this.name = 'UserAlreadyCommentedProgramException';
    }
}

export {UserAlreadyCommentedProgram};
