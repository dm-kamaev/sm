export interface SomeSchoolData {
    name: string,
    abbreviation: string,
    fullName: string,
    schoolType: string,
    director: string,
    phones: string[],
    govermentKey: number,
    totalScore: number,
    description: string,
    features: string[],
    dressCode: boolean,
    extendedDayCost: string,
    links: string[][],
};


export interface SomeOptionalSchoolData {
    name?: string,
    abbreviation?: string,
    fullName?: string,
    schoolType?: string,
    director?: string,
    phones?: string[],
    govermentKey?: number,
    totalScore?: number,
    description?: string,
    features?: string[],
    dressCode?: boolean,
    extendedDayCost?: string,
    links?: string[][],
};


export interface SomeSchoolInfo {
    id: number,
    name: string,
    schoolType: string,
    numberComments: number,
    totalScore: number,
    areaName: string,
    districtName: string,
    updatedAt: string,
};

