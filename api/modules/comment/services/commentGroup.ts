import {Model as CommentGroupModel} from '../models/commentGroup';
import {CommentGroupInstance} from '../types/commentGroup';

class CommentGroup {
    public async create(): Promise<CommentGroupInstance> {
        return CommentGroupModel.create();
    }
}

const commentGroupService = new CommentGroup();

export {commentGroupService as service};
