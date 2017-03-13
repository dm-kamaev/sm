import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class CityAlreadyExistException extends Exception {
    public readonly name: string;

    constructor(cityName: string) {
        super(`City with name = "${cityName}" already exist`);

        this.name = 'CityAlreadyExistException';
    }
}
