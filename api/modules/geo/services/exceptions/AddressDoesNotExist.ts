import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export default class AddressDoesNotExist extends Exception {
    readonly name: string;

    constructor(addressName: string) {
        super(`Address '${addressName}' does not exist`);

        this.name = 'AddressDoesNotExistException';
    }
}
