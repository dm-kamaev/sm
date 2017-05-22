import {BackendCourse} from '../../course/types/course';

export interface BackendProgramMajor {
    id: number;
    name: string;
    popularity?: number;
    createdAt: Date;
    updatedAt: Date;
};

export interface BackendProgramMajorPopular {
    programMajor: BackendProgramMajor[];
    count: number;
}
