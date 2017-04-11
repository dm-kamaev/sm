import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class UniversityAliasDuplicateException extends Exception {
    public readonly name: string;

    constructor(alias: string, duplicate) {
        super(
          `university with alias: "${alias}" already exist\n` +
          `page=${JSON.stringify(duplicate, null, 2)}`
        );

        this.name = 'UniversityAliasDuplicateException';
    }
}
