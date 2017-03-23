/**
 * @fileOverview Service for make CRUD operations on model
 */
import {Service} from '../../common/services/Service';

import {BackendUser} from '../types/user';
import {UserNotLoggedInException} from './exceptions/UserNotLoggedIn';
import {RequestParams} from '../../common/services/Service';
import {uniq as lodashUniq} from 'lodash';

const config = require('../../../config/config.json');

class UserService extends Service {
    constructor() {
        super();

        this.baseUrl = config.userApi;
    }

    public getUserFromRequest(request: any): BackendUser {
        const user = request.user;
        if (!user) {
            throw new UserNotLoggedInException();
        }

        return user;
    }

    public async getById(id: number): Promise<BackendUser>
    public async getById(id: Array<number>): Promise<Array<BackendUser>>
    public async getById(
            id: number | Array<number>
    ): Promise<BackendUser | Array<BackendUser>> {
        let result;
        if (Array.isArray(id)) {
            result = this.getAllByIds_(id);
        } else {
            result = this.getOneById_(id);
        }

        return await result;
    }


    protected handleError(error) {
        throw error;
    }

    private async getOneById_(id: number): Promise<BackendUser> {
        const requestParams: RequestParams = {
            url: `${this.baseUrl}/user/${id}`,
            method: 'get'
        };

        const response = await this.send(requestParams);
        return response.data;
    }

    private async getAllByIds_(
            ids: Array<number>): Promise<Array<BackendUser>> {
        const uniqueIds = lodashUniq(ids);
        let result = [];

        if (uniqueIds.length > 0) {
            const formattedIds = uniqueIds.reduce(
                    (previous, id) => `${previous},${id}`,
                    String(uniqueIds[0])
                ),
                requestParams: RequestParams = {
                    url: `${this.baseUrl}/users/?id=${formattedIds}`,
                    method: 'get'
                };

            const response = await this.send(requestParams);
            result = response.data;
        }

        return result;
    }
}

export const userService = new UserService();
