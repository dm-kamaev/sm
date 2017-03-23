export interface ProgramCommentData {
    id?: number;
    userType?: string;
    grade?: number;
    yearGraduate?: number;
    pros?: string;
    cons?: string;
    advice?: string;
    score?: Array<number>;
}

export interface BackendProgramComment extends ProgramCommentData {
    totalScore?: number;
    userId?: number;
}
