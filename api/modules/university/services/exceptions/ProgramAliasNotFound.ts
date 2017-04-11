import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class ProgramAliasNotFound extends Exception {
    public readonly name: string;

    constructor(universityAlias: string) {
        super(`Program with alias = ${universityAlias} not found`);

        this.name = 'ProgramAliasNotFoundException';
    }
}
