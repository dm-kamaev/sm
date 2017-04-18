import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class UniversityNameIsEmptyException extends Exception {
    public readonly name: string;

    constructor(universityName: string) {
        super(`university name is empty "${universityName}"`);

        this.name = 'UniversityNameIsEmptyException';
    }
}
