/**
 * @fileOverview Exception, which occurs when comment group with given id
 * not found
 */
import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class CommentGroupNotFound extends Exception {
    public readonly name: string;

    constructor(commentGroupId: number) {
        super(`Comment group with id = ${commentGroupId} not found`);

        this.name = 'CommentGroupNotFoundException';
    }
}

export {CommentGroupNotFound};
