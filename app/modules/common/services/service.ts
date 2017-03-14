import * as axios from 'axios';

const config = require('../../../config/admin');

const headers = {
    [config.headers.token.name]: config.headers.token.value
};

abstract class Service {

    private axios: Axios.AxiosInstance;

    constructor() {
        this.axios = axios.create({
            headers
        });
    }

    public async post(
        url: string,
        data?: any,
        config?: Axios.AxiosXHRConfigBase<any>
    ): Promise<Axios.AxiosXHR<any>> {
        let res: Axios.AxiosXHR<any>;

        try {
            res = await(this.axios.post(url, data, config));
        } catch (error) {
            this.handleError(error);
        }

        return res;
    }

    public async get(
        url: string,
        config?: Axios.AxiosXHRConfigBase<any>
    ): Promise<Axios.AxiosXHR<any>> {
        let res: Axios.AxiosXHR<any>;

        try {
            res = await(this.axios.get(url, config));
        } catch (error) {
            this.handleError(error);
        }

        return res;
    }

    protected abstract handleError(error: any): void;
}

export {Service};
