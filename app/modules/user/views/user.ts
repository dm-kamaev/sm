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
                photoUrl: user.photoUrl
            } :
            null;
    }
}

export const userView = new UserView();
