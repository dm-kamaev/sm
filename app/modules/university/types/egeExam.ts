export interface BackendEgeExam {
    id: number;
    subjectId: number;
    subjectName: string;
    programId: number;
    isMain: boolean;
}

export interface Subject {
    id: number;
    name: string;
    displayName: string;
    alias: string;
    created_at: string;
    updated_at: string;
}
