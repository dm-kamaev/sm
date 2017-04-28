/**
 * @fileoverview Types related to search
 */
import {
    lSearchUniversity
} from '../../../blocks/n-university/l-search_university/params';

export type QueryParams = {
    cities?: (string | number[]);
    egeSubjects?: (string | number[]);
    payType?: (string | number[]);
    egeResults?: string;
    maxPrice?: number;
    majors?: (string | number[]);
    features?: (string | number[]);
    page?: number;
    sortType?: number;
};

export type EgeResult = lSearchUniversity.Params.EgeResult;

export type SearchParams = lSearchUniversity.Params.SearchParams;

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

