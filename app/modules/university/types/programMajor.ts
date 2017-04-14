import {BackendCourse} from '../../course/types/course';

export interface BackendProgramMajor {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface BackendCourseAdviced extends BackendCourse {
    courseType: {
        id: number;
        name: string;
    }
}
