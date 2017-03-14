import * as Sequelize from 'sequelize/v3';

import {AddressAttribute, AddressInstance} from '../../geo/types/address';
import {ProgramMajorInstance} from '../models/ProgramMajor';
import {CommentGroupInstance} from '../../comment/types/commentGroup';
import {PageAttribute, PageIntstance} from '../../entity/types/page';

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
    programMajorId?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProgramInstance
        extends Sequelize.Instance<ProgramAttribute>, ProgramAttribute {
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
    programMajor: ProgramMajorInstance;
}

export interface ProgramAdmin extends ProgramAttribute {
    addressName?: string;
}
