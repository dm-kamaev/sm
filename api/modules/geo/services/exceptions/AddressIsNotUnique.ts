import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export default class AddressIsNotUnique extends Exception {
    public readonly name: string;

    constructor(addressName: string) {
        super(`Address '${addressName}' relates to another school`);

        this.name = 'AddressIsNotUniqueException';
    }
}
