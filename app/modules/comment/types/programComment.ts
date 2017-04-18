export interface ProgramCommentData {
    id?: number;
    userType?: string;
    grade?: number;
    yearGraduate?: string;
    pros?: string;
    cons?: string;
    advice?: string;
    score?: Array<number>;
}

export interface BackendProgramComment extends ProgramCommentData {
    totalScore?: number;
    userId?: number;
}
