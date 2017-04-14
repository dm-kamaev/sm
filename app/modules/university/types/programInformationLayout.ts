import {BackendProgram} from './program';
import {BackendProgramComment} from '../../comment/types/programComment';
import {BackendUniversity} from './university';
import {BackendEgeExam} from './egeExam';
import {BackendEntranceStatistic} from './entranceStatistic';
import {BackendUser} from '../../user/types/user';
import {BackendProgramMeta} from '../types/programMeta';
import {AppConfig} from '../../common/types/layout';
import {BackendSimilarProgram} from '../types/similarProgram';
import {BackendCourseAdviced} from '../types/programMajor';

export type RenderParams = {
    data: BackendData;
    config: AppConfig;
    requestData: {
        user: BackendUser;
        csrf: string;
        query: any;
    }
};

export type BackendData = {
    program: BackendProgram,
    university: BackendUniversity,
    entranceStatistic: BackendEntranceStatistic,
    comments: Array<BackendProgramComment>,
    egeExams: Array<BackendEgeExam>,
    userComment: BackendProgramComment,
    users: Array<BackendUser>,
    favorites: Array<{string: any}>,
    pageMeta: BackendProgramMeta,
    similarPrograms: BackendSimilarProgram[],
    usefulCourses: BackendCourseAdviced[]
};

