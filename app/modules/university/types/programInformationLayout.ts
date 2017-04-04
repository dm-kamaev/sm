import {BackendProgram} from './program';
import {BackendProgramComment} from '../../comment/types/programComment';
import {BackendUniversity} from './university';
import {BackendEgeExam} from './egeExam';
import {BackendEntranceStatistic} from './entranceStatistic';
import {BackendUser} from '../../user/types/user';
import {AppConfig} from '../../common/types/layout';

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
    favorites: Array<{string: any}>
};

