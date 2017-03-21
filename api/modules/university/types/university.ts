import {UniversityAttribute} from '../models/University';

export interface UniversityAdminList extends UniversityAttribute {
    cityName?: string;
    programCount?: number;
    profiles?: Array<{id: number, name: string}>;
};
