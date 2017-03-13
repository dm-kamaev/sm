import {
    UserAttributes,
    DefaultRender,
    SchoolRender,
    CommentUser
} from '../types/user';

const socialType = require('../enums/socialType');


class UserView {
    public renderDefault(user: UserAttributes): DefaultRender | null {
        return user.id ?
            {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName
            } :
            null;
    }

    public school(
            user: UserAttributes, isCommented: boolean): SchoolRender | null {
    return user.id ?
        {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            isCommented: isCommented || false
        } :
        null;
    }

    public renderCommentUser(user: UserAttributes): CommentUser {
        return {
            name: user.firstName || null,
            socialId: this.getSocialId_(user),
            socialType: this.getSocialType_(user)
        };
    }

    private getSocialId_(user: UserAttributes): string | null {
        return user.vkId || user.facebookId || null;
    }

    private getSocialType_(user: UserAttributes): string {
        let result = null;
        if (user.vkId) {
            result = socialType.VKONTAKTE;
        } else if (user.facebookId) {
            result = socialType.FACEBOOK;
        }

        return result;
    }
}

export const userView = new UserView();
