import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class CityNameNotValidException extends Exception {
    public readonly name: string;

    constructor(cityName: string) {
        super(`City name = "${cityName}" not valid`);

        this.name = 'CityNameNotValidException';
    }
}
