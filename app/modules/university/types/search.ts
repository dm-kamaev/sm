/**
 * @fileoverview Types related to search
 */

export type UrlQueryParams = {
    cities?: string;
    egeSubjects?: string;
    payType?: string;
    egeResults?: string;
    maxPrice?: number;
    majors?: string;
    features?: string;
    page?: number;
    sortType?: number;
};

export type ApiQueryParams = {
    cities?: number[];
    egeSubjects?: number[];
    payType?: number[];
    egeResults?: string;
    maxPrice?: number[];
    majors?: number[];
    features?: number[];
    page?: number;
    sortType?: number;
};

export type EgeResult = {
    subjectId: number;
    value: number;
};

export type SearchParams = {
    cities?: number[];
    egeSubjects?: number[];
    payType?: number[];
    egeResults?: EgeResult[];
    maxPrice?: number[];
    majors?: number[];
    features?: number[];
    page?: number;
    sortType?: number;
};

export type BackendEgeSearchParam = {
    [name: number]: number;
};

export type BackendSearchParams = {
    cities?: number[];
    payType?: number[];
    ege?: BackendEgeSearchParam[];
    maxPrice?: number[];
    majors?: number[];
    features?: number[];
    page?: number;
    sortType?: number;
};

