import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class CityNameEmptyException extends Exception {
    public readonly name: string;

    constructor(cityName: string | null | undefined) {
        super(`City name = "${cityName}" is empty`);

        this.name = 'CityNameEmptyException';
    }
}
