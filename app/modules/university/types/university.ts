import {BackendCity} from './city';

export interface BackendUniversity {
    id: number;
    name: string;
    abbreviation: string;
    description: string;
    imageUrl?: string;
    relapImageUrl?: string;
    links: Array<string>;
    militaryDepartment: boolean;
    dormitory: boolean;
    cityId: number;
    city: BackendCity;
    created_at: Date;
    updated_at: Date;
}
