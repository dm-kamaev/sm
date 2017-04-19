import {
    BackendUser,
    UserData
} from '../types/user';

class UserView {
    public render(user: BackendUser): UserData | null {
        return user ?
            {
                firstName: user.firstName,
                lastName: user.lastName
            } :
            null;
    }
}

export const userView = new UserView();
