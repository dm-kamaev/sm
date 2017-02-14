import {SchoolInstance} from '../../school/models/school';
import {CourseBrandInstance} from '../../course/models/courseBrand';

export type ApiAccessAttributes = {
    schoolName?: string,
    brandName?: string,
    isSuperUser?: boolean
};

export type ApiAdminUser = {
    userId: number,
    accessAttributes: ApiAccessAttributes
};

export type AccessAttributesInstances = {
    school: SchoolInstance,
    brand: CourseBrandInstance
};

export type AccessAttributesInstancesArrays = {
    schools: Array<SchoolInstance>,
    brands: Array<CourseBrandInstance>
};
