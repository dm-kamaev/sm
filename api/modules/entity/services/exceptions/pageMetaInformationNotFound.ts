import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class PageMetaInformationNotFound extends Exception {
    public readonly name: string;

    constructor(pageMetaId: number) {
        super(`Page meta information with id = ${pageMetaId} not found`);

        this.name = 'PageMetaNotFoundException';
    }
}
