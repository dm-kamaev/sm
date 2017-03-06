import * as Sequelize from 'sequelize/v3';

import {AddressAttribute, AddressInstance} from '../../geo/types/address';

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
    exchangeProgram?: boolean;
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
}

export interface ProgramAdmin extends ProgramAttribute {
    addressName?: string;
}
