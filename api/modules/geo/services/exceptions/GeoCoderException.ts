import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class GeoCoderException extends Exception {
    public readonly name: string;

    constructor(error) {
        error = (error instanceof Error) ?
                error :
                JSON.stringify(error, null, 2);
        super('Yandex GeoCoder is crash: ' + error);

        this.name = 'GeoCoderException';
    }
}
