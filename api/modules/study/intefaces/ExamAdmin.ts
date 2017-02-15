export type examResult = {
    id: number;
    subject: string;
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

export interface ExamResult {
    id: number;
    subject: string;
    year: number;
    averageResult: number;
    passedCount: number;
}

export interface ExamResultUpdate {
    id: number;
    schoolId: number;
    subjectId: number;
    year: number;
    passedCount: number;
    averageResult: number;
}


export interface SchoolSubject {
  id: number;
  displayName: string;
}