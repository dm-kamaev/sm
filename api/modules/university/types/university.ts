import {UniversityAttribute} from '../models/University';
import {UniversityProfileInstance} from '../models/UniversityProfile';

export interface UniversityAdminList extends UniversityAttribute {
    cityName?: string;
    programCount?: number;
    profiles?: Array<{id: number, name: string}>;
}

export interface UniversityAdmin extends UniversityAttribute {
    image?: string;
    relapImage?: string;
    profiles?: Array<UniversityProfileInstance>;
}
