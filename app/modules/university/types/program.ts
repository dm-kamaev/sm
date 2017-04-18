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
    programMajor: BackendProgramMajor;
    addressName: string;
}

export interface SuggestProgram {
    id: number;
    name: string;
    alias: string;
    score: number[];
    totalScore: number;
}
