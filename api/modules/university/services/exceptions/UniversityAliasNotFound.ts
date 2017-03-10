import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class UniversityAliasNotFound extends Exception {
    public readonly name: string;

    constructor(universityAlias: string) {
        super(`University with alias = ${universityAlias} not found`);

        this.name = 'UniversityAliasNotFoundException';
    }
}
