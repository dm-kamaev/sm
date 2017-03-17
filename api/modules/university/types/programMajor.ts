import {ProgramMajorAttribute} from '../models/ProgramMajor';

export interface ProgramMajorAdmin extends ProgramMajorAttribute {
    courseTypes?: Array<number>;
}
