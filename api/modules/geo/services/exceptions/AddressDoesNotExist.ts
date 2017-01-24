import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class AddressDoesNotExist extends Exception {
    public readonly name: string;

    constructor(addressName: string) {
        super(`Address '${addressName}' does not exist`);

        this.name = 'AddressDoesNotExistException';
    }
}
