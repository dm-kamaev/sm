import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class ProfileNotFound extends Exception {
    public readonly name: string;

    constructor(schoolId: number, profileId: number) {
        super(`School with id ${schoolId} has no profile with id ${profileId}`);

        this.name = 'ProfileNotFoundException';
    }
}
