export type examResult = {
    id: number;
    subject: string;
    subjectId: number;
    year: number;
    averageResult: number;
    passedCount: number;
};

export type examResultEdit = {
    id: number;
    schoolId: number;
    subjectId: number;
    year: number;
    passedCount: number;
    averageResult: number;
};
