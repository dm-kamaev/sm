import {
    BackendUser,
    UserData
} from '../types/user';

class UserView {
    public render(user: BackendUser): UserData | null {
        return user ?
            {
                firstName: user.firstName,
                lastName: user.lastName,
                photoUrl: user.photoUrl ||
                    '/static/images/n-common/b-sm-header/cat.jpg'
            } :
            null;
    }
}

export const userView = new UserView();
