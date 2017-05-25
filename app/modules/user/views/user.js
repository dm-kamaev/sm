"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserView {
    render(user) {
        return user ?
            {
                firstName: user.firstName,
                lastName: user.lastName,
                photoUrl: user.photoUrl
            } :
            null;
    }
}
exports.userView = new UserView();
