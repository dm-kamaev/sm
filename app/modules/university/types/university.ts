import {BackendCity} from './city';

interface Profile {
    id: number;
    name: string;
}

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
    profiles: Array<Profile>;
    created_at: Date;
    updated_at: Date;
}
