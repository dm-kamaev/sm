import {ProgramMajorAttribute} from '../models/ProgramMajor';

export interface ProgramMajorAdmin {
    name: string;
    courseTypes?: Array<number>;
}
