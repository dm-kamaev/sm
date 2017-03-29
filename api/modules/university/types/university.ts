import {UniversityAttribute} from '../models/University';
import {UniversityProfileInstance} from '../models/UniversityProfile';

export interface UniversityAdminList extends UniversityAttribute {
    cityName?: string;
    programCount?: number;
    profileName?: string;
    profilesName?: string;
}

export interface UniversityAdmin extends UniversityAttribute {
    image?: string;
    relapImage?: string;
    profiles?: Array<UniversityProfileInstance>;
}
