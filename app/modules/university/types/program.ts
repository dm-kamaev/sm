import {BackendProgramMajor} from './programMajor';

export interface BackendProgram {
    id: number;
    name: string;
    universityId: number;
    description: string;
    commentGroupId: number;
    category: number;
    links: Array<string>;
    specializations: Array<string>;
    duration: number;
    employment: number;
    salary: number;
    extraExam: Array<string>;
    exchangeProgram: boolean;
    createdAt: Date;
    updatedAt: Date;
    oksoCode?: string;
    programMajor: BackendProgramMajor;
    addressName: string;
}

export interface BackendProgramResults {
    programCount: number;
    universityCount: number;
    programs: Array<BackendListProgram>;
}

export interface BackendProgramCountResults {
    programCount: number;
}

export interface BackendListProgram {
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
}

export interface SuggestProgram {
    id: number;
    name: string;
    alias: string;
    score: number[];
    totalScore: number;
}

export interface BackendSuggestProgram extends SuggestProgram {
    universityAbbreviation: string;
}

export interface SuggestList {
    programs: SuggestProgram[];
}

export interface BackendSuggestList {
    programs: BackendSuggestProgram[];
}
