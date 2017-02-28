'use strict';

import {Model as UserDataModel} from '../models/userData';

const services = require('../../../../app/components/services').all;

import {UserDataAttributes, UserDataInstance} from '../types/userData';

class UserDataService {
    public readonly name: string = 'userData';

    public async create(data: UserDataAttributes): Promise<UserDataInstance> {
        return await UserDataModel.create({
            userType: data.userType,
            yearGraduate: data.yearGraduate ? data.yearGraduate : null,
            grade: data.grade ? data.grade : null,
            key: data.key ? data.key : null,
            username: data.username ? data.username : null,
            userId: data.userId
        });
    }

    public async checkCredentials(
            commentGroupId: number, userId: number): Promise<boolean> {
        const comments = await services.comment.getComments(commentGroupId),
            userComments = comments.filter(comment =>
                comment.userData.userId == userId
            ); // only one comment can be left by a user on the page

        return userComments && userComments[0];
    }

    public async update(
            userDataId: number, data: UserDataAttributes
    ): Promise<UserDataInstance> {
        const userData = await this.silentGetOne_(userDataId);

        await userData.update(data);

        return userData;
    }

    private async silentGetOne_(userDataId: number): Promise<UserDataInstance> {
        return await UserDataModel.findById(userDataId);
    }
}

export const service = new UserDataService();
