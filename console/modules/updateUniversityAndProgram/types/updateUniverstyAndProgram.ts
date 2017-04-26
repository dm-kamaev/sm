

export type Hash<T> = {[key: string]: T};


export interface IUniversities {
    getHashUniversities(): Promise<Hash<number>>;
};


export interface IPrograms {
    getHashPrograms(): Promise<Hash<number>>;
};


export interface ICities {
    getHashCity(): Promise<Hash<number>>;
};


export type Columns = {
    city?: string;
    universityName?: string;
    universityAbbreviation?: string;
    programName?: string;
    duration?: string;
    descriptionProgram?: string;
    specialtyСodificator?: string;
    militaryDepartment?: string;
    dormitory?: string;
    programMajor?: string;
    competition?: string;
    budgetPlaces?: string;
    commercialPlaces?: string;
    cost?: string;
    egePassScore?: string;
    ege?: string;
    extraExam?: string;
    programSite?: string;
};


export type EgeInfo = {subjectId: number, subjectName: string};


export type EgeExamInfo = {
    programId?: number;
    egeInfo?: EgeInfo[];
    extraExam?: string[]
};
