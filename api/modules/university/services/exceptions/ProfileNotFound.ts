import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class ProfileNotFound extends Exception {
    public readonly name: string;

    constructor(profileId: number) {
        super(`Profile with id = ${profileId} not found`);

        this.name = 'ProfileNotFoundException';
    }
}
