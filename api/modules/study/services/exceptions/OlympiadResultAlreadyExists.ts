/**
 * @fileOverview Exception, which occurs when olympiad result parameters
 * already exists
 */
import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

import {olympiadResultUniqueData} from '../../types/OlympiadResult';

class OlympiadResultAlreadyExists extends Exception {
    public readonly name: string;

    constructor(schoolId: number, data: olympiadResultUniqueData) {
        const message = `Olympiad result with for school id = ${schoolId}` +
            ` and subject id = ${data.subjectId} for class = ${data.class}` +
            ` and type = ${data.type} and ${data.status}` +
            ` at ${data.year} year already exists`;
        super(message);

        this.name = 'OlympiadResultsAlreadyExists';
    }
}

export {OlympiadResultAlreadyExists};
