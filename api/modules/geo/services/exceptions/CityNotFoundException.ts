import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class CityNotFoundException extends Exception {
    public readonly name: string;

    constructor(cityId: number) {
        super(`City with id = "${cityId}" not found`);

        this.name = 'CityNotFoundException';
    }
}
