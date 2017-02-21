/**
 * @fileOverview Type for course model
 */
import * as Sequelize from 'sequelize/v3';

import {
    PageMetaInformationAttributes,
    PageMetaInformationInstance
} from '../../entity/types/pageMetaInterfaces';


export interface CourseAttributes {
    id?: number;
    name?: string;
    brandId: number;
    type: string;
    description: string;
    fullDescription: string;
    about: string;
    entranceExam: string;
    learningOutcome: string;
    leadType: string;
    score: Array<number>;
    scoreCount: Array<number>;
    totalScore?: number;
    imageUrl?: string;
    embedId?: string;
    ctr: number;
}

export interface CourseInstance
    extends Sequelize.Instance<CourseAttributes>, CourseAttributes {
        addPageMetaInformation:
            Sequelize.BelongsToManyAddAssociationsMixin<
                PageMetaInformationInstance,
                number,
                PageMetaInformationAttributes
            >;
        getPageMetaInformations:
            Sequelize.BelongsToManyGetAssociationsMixin<
                PageMetaInformationInstance
            >;
        hasPageMetaInformation:
            Sequelize.BelongsToManyHasAssociationMixin<
                PageMetaInformationInstance,
                number
            >;
}
