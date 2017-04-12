import * as Sequelize from 'sequelize/v3';

import {AddressAttribute, AddressInstance} from '../../geo/types/address';
import {ProgramMajorInstance} from '../models/ProgramMajor';
import {ProgramPageMetaInformationInstance} from './programPageMetaInformation';
import {CommentGroupInstance} from '../../comment/types/commentGroup';
import {PageAttribute, PageIntstance} from '../../entity/types/page';
import {EntranceStatisticInstance} from '../models/EntranceStatistic';
import {ProgramEgeExamInstance} from '../models/ProgramEgeExam';

export interface ProgramAttribute {
    id?: number;
    name?: string;
    universityId?: number;
    description?: string;
    commentGroupId?: number;
    category?: string;
    links?: Array<string>;
    specializations?: Array<string>;
    duration?: number;
    employment?: number;
    salary?: number;
    extraExam?: Array<string>;
    exchangeProgram?: string;
    phone?: string;
    programMajorId?: number;
    oksoCode?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProgramSimilar {
    id: number;
    name: string;
    url: string;
}

export interface ProgramInstance
        extends Sequelize.Instance<ProgramAttribute>, ProgramAttribute {
    programMajor?: ProgramMajorInstance;
    programPageMetaInformations?: ProgramPageMetaInformationInstance;
    commentGroup?: CommentGroupInstance;
    entranceStatistics?: Array<EntranceStatisticInstance>;
    programEgeExams?: Array<ProgramEgeExamInstance>;

    addAddress: Sequelize.BelongsToManyAddAssociationsMixin<
            AddressInstance, number, AddressAttribute
        >;
    getAddresses: Sequelize.BelongsToManyGetAssociationsMixin<
            AddressInstance
        >;
    setAddresses: Sequelize.BelongsToManyAddAssociationsMixin<
        AddressInstance, number, AddressAttribute>;
    getCommentGroup:
        Sequelize.BelongsToGetAssociationMixin<CommentGroupInstance>;
    setPages: Sequelize.BelongsToManySetAssociationsMixin<
        PageIntstance, number, PageAttribute>;
}

export interface ProgramAdmin extends ProgramAttribute {
    addressName?: string;
    pageMetaId?: number;
    commentCount?: number;
    passScore?: number;
    programUrl?: string;
}

export interface ProgramUrl {
    id: number;
    url: string;
}
