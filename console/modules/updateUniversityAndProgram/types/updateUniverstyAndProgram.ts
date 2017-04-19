
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
