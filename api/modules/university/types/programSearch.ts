export type QueryParams = {
    limit?: string;
    page?: string;
    sortType?: string;
    searchString?: string;
    cities?: string;
    ege?: string;
    payType?: string;
    majors?: string;
    discount?: string;
    features?: string;
    maxPrice?: string;
    maxPassScore?: string;
};

export type SearchParams = {
    limit?: number;
    page?: number;
    sortType?: number;
    searchString?: string;
    cities?: number[];
    ege?: number[];
    payType?: number[];
    majors?: number[];
    discount?: boolean;
    features: number[];
    maxPrice?: number;
    maxPassScore?: number;
};

export type ListProgram = {
    id: number;
    name: string;
    totalScore: number;
    exchangeProgram: string;
    extraExam: string[];
    egeScore: number;
    cost: number;
    budgetPlaces: number;
    commercialPlaces: number;
    competition: number;
    imageUrl: string;
    universityName: string;
    universityAbbreviation: string;
    cityName: string;
    programAlias: string;
    universityAlias: string;
    programCount?: string;
    universityCount?: string;
};

export type SearchListResult = {
    programCount: number;
    universityCount: number;
    programs: ListProgram[]
};
