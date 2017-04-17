import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class UniversityNotFound extends Exception {
    public readonly name: string;

    constructor(universityId: number) {
        super(`University with id = ${universityId} not found`);

        this.name = 'UniversityNotFoundException';
    }
}
