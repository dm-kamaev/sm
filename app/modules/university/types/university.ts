interface City {
    id: number;
    name: string;
    regionId: number;
}

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
    city: City;
    profiles: Array<Profile>;
    created_at: Date;
    updated_at: Date;
}
