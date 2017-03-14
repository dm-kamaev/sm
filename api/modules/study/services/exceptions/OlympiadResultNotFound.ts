/**
 * @fileOverview Exception, which occurs when olympiad result with given
 * schoolId and id not found
 */
import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class OlympiadResultNotFound extends Exception {
    public readonly name: string;

    constructor(resultId: number) {
        super(`Olympiad result with id = ${resultId} not found`);

        this.name = 'OlympiadResultNotFound';
    }
}

export {OlympiadResultNotFound};
