import {BackendCourse} from '../../course/types/course';

export interface BackendProgramMajor {
    id: number;
    name: string;
    popularity?: number;
    createdAt: Date;
    updatedAt: Date;
}
