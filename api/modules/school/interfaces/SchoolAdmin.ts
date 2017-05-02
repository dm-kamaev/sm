export interface SchoolDataForCreate {
    name: string;
    abbreviation: string;
    fullName: string;
    schoolType: string;
    director: string;
    phones: string[];
    govermentKey: number;
    rankDogm: number;
    description: string;
    features: string[];
    dressCode: boolean;
    extendedDayCost: string;
    links: string[][];
};

export interface SchoolDataForUpdate {
    name?: string;
    abbreviation?: string;
    fullName?: string;
    schoolType?: string;
    director?: string;
    phones?: string[];
    govermentKey?: number;
    rankDogm?: number;
    description?: string;
    features?: string[];
    dressCode?: boolean;
    extendedDayCost?: string;
    links?: string[][];
};

export interface SchoolDataForView {
    id: number;
    name: string;
    schoolType: string;
    numberComments: number;
    rankDogm: number;
    areaName: string;
    districtName: string;
    updatedAt: string;
};


export interface SchoolAddresses {
    [key: string]: {areaName: string, districtName: string};
}