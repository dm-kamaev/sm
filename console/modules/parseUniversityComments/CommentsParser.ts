import {find as lodashFind} from 'lodash';

import {xlsx} from '../../../api/components/xlsx';

import {
    service as programCommentService
} from '../../../api/modules/comment/services/programComment';

import {
    Model as UniversityModel
} from '../../../api/modules/university/models/University';
import {
    Model as ProgramModel
} from '../../../api/modules/university/models/Program';

const userTypeEnum = require('../../../api/modules/user/enums/userType');

import {
    ProgramCommentFullCreateAttributes
} from '../../../api/modules/comment/types/programComment';
import {
    UniversityInstance
} from '../../../api/modules/university/models/University';
import {ProgramInstance} from '../../../api/modules/university/types/program';

interface LogWriter {
    info(message: string | object): void;
    error(message: string | object): void;
}

type FileComment = {
    programName: string;
    universityName: string;
    name: string;
    userType: string;
    yearGraduate?: string;
    grade?: string;
    pros?: string;
    cons?: string;
    advice?: string;
    education?: string;
    infrastructure?: string;
    teaching?: string;
    atmosphere?: string;
    [key: string]: string;
};

interface UploadComment extends ProgramCommentFullCreateAttributes {
    programId: number;
    isNoticeSend: boolean;
}

interface UserStage {
    grade?: number;
    yearGraduate?: number;
}

const SHEET: string = 'Comments';
const POLL_YEAR: number = 2017;
const BACHELOR_LENGTH: number = 4;
const YEAR_TO_GRADE: number = POLL_YEAR - BACHELOR_LENGTH;
const MIN_GRADE = 1;
const MAX_GRADE = 6;

export class CommentsLoader {
    protected logger: LogWriter;
    protected universities: UniversityInstance[];
    protected programs: ProgramInstance[];

    constructor(logger: LogWriter) {
        this.logger = logger;
    }

    public async loadComments(filePath: string) {
        const fileComments: FileComment[] =
            await this.readFileComments(filePath);
        const userTypes = [];
        await this.initData();
        const normalizedComments = await this.normalizeComments(fileComments);
        this.checkComments(normalizedComments);
        this.logger.info('Start uploading comments');
        await this.uploadComments(normalizedComments);
        this.logger.info('Start updating rating');
        await this.updateRating(normalizedComments);
    }

    private async readFileComments(filePath: string): Promise<FileComment[]> {
        const fileRows: any[] = await xlsx.getJson(filePath, {sheet: SHEET});
        const fileComments: FileComment[] = fileRows.filter(comment =>
            !!comment.universityName && !!comment.programName);
        return fileComments;
    }

    private async normalizeComments(
            fileComments: FileComment[]): Promise<UploadComment[]> {
        return fileComments.map(fileComment => {
            const userType = this.getUserType(fileComment.userType);
            const normalizedComment: UploadComment = {
                    programId: this.getProgramId(
                        fileComment.programName,
                        fileComment.universityName
                    ),
                    pros: fileComment.pros,
                    cons: fileComment.cons,
                    advice: fileComment.advice,
                    userType: userType,
                    username: fileComment.name,
                    score: [
                        Number(fileComment.education),
                        Number(fileComment.teaching),
                        Number(fileComment.atmosphere),
                        Number(fileComment.infrastructure)
                    ],
                    isNoticeSend: true
            };
            const grade: number = parseInt(fileComment.grade, 10);
            const yearGraduate: number = Number(fileComment.yearGraduate);
            const userStage = this.getUserStage(userType, grade, yearGraduate);
            normalizedComment.grade = userStage.grade;
            normalizedComment.yearGraduate = userStage.yearGraduate;
            return normalizedComment;
        });
    }

    private async initData(): Promise<void> {
        this.universities = await this.getUniversities();
        this.programs = await this.getPrograms();
    }

    private async getUniversities(): Promise<UniversityInstance[]> {
        return UniversityModel.findAll();
    }

    private async getPrograms(): Promise<ProgramInstance[]> {
        return ProgramModel.findAll();
    }

    private getProgramId(programName: string, universityName: string): number {
        const commentUniversity = this.findUniversity(universityName);
        const commentProgram = this.findProgram(
            programName,
            commentUniversity.id
        );
        return commentProgram.id;
    }

    private findUniversity(universityName: string): UniversityInstance {
        const foundUniversity = lodashFind(this.universities, (university =>
            university.name === universityName));
        if (!foundUniversity) {
            throw new Error(`University with name` +
                ` ${universityName} not found`);
        }
        return foundUniversity;
    }

    private findProgram(
            programName: string, universityId: number): ProgramInstance {
        const foundProgram = lodashFind(this.programs, (program =>
            program.name === programName &&
                program.universityId === universityId
        ));
        if (!foundProgram) {
            throw new Error(`Program with name ${programName} ` +
                `and universityId ${universityId} not found`);
        }
        return foundProgram;
    }

    private getUserType(userType: string): string {
        let result = '';
        switch (userType) {
        case 'выпускник':
            result = userTypeEnum.GRADUATE;
            break;
        case 'студент':
            result = userTypeEnum.STUDENT;
            break;
        }
        return result;
    }

    private getUserStage(
            userType: string, grade: number, yearGraduate: number): UserStage {
        const result: UserStage = {};
        if (userType === userTypeEnum.GRADUATE) {
            result.yearGraduate = yearGraduate;
        } else if (grade) {
            result.grade = grade;
        } else {
            result.grade = yearGraduate - YEAR_TO_GRADE;
        }
        return result;
    }

    private getYearGraduate(
            yearGraduate: number, userType: string): number | null {
        return userType === userTypeEnum.GRADUATE ?
            yearGraduate :
            null;
    }

    private checkComments(comments: UploadComment[]): void {
        comments.forEach((comment, i) => {
            this.checkProgramId(comment);
            this.checkGrade(comment);
            this.checkStage(comment);
        });
    }

    private checkProgramId(comment: UploadComment): void {
        if (!comment.programId) {
            this.logger.error(comment);
            throw new Error('Program id is missing');
        }
    }

    private checkGrade(comment: UploadComment): void {
        if (!comment.yearGraduate &&
                (comment.grade > MAX_GRADE || comment.grade < MIN_GRADE)) {
            this.logger.error(comment);
            throw new Error('Grade is incorrect');
        }
    }

    private checkStage(comment: UploadComment): void {
        if ((comment.userType === userTypeEnum.STUDENT && !comment.grade)) {
            this.logger.error(comment);
            throw new Error('Student must have grade');
        } else if (comment.userType === userTypeEnum.GRADUATE &&
                !comment.yearGraduate) {
            this.logger.error(comment);
            throw new Error('Graduate must have yearGraduate');
        }
    }

    private uploadComments(
            comments: UploadComment[]): Promise<void[]> {
        return Promise.all(comments.map(this.uploadComment));
    }

    private async uploadComment(comment: UploadComment): Promise<void> {
        return await programCommentService.fullCreateDb(
            comment.programId,
            comment
        );
    }

    private async updateRating(comments: UploadComment[]): Promise<void> {
        await Promise.all(
            this.programs
                .filter(program =>
                    comments.find(comment => comment.programId == program.id)
                )
                .map(program =>
                    programCommentService.updateRatings(program.commentGroupId)
                )
        );
    }
}
