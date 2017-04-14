export interface BackendCourse {
    id: number;
    name: string;
    brandId: number;
    type: number;
    description: string;
    fullDescription: string;
    about: string;
    entranceExam: string;
    learningOutcome: string;
    leadType: string;
    score: number[];
    scoreCount: number;
    totalScore: number;
    imageUrl: string;
    embedId: string;
    ctr: number;
};
