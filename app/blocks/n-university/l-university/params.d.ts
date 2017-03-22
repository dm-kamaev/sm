import {
    bSmSubheader
} from '../../n-common/b-sm-subheader/params';

import {iLayoutStendhal} from '../../n-clobl/i-layout/params';
import {bSmCollapsedText} from '../../n-common/b-sm-collapsed-text/params';
import {bSummaryBoard} from '../b-summary-board/params';
import {bEntityRelation} from '../b-entity-relation/params';
import {bSmBanner} from '../../n-common/b-sm-banner/params';
import {bDescriptionList} from './b-description-list/params';

export namespace lUniversity {
    /*
     * sm.lUniversity.Params
     */
    export namespace Params {
        /*
         * sm.lUniversity.Params.Data
         */
        export interface Data extends iLayoutStendhal.Params.Data {
            entityData: {
                id: number,
                name: string,
                subunitName: string,
                subunitType: string,
                description: string,
                cutDescription: {
                    cutText?: string,
                    fullText?: string;
                },
                descriptionList: bDescriptionList.Params.Data,
                summaryBoard: bSummaryBoard.Params.Data,
                banner?: bSmBanner.Params,
                entityRelation?: bEntityRelation.Params,
                similarPrograms?: any,
                usefulCourses?: any,
                comments?: any
            };
            subscribeBoard: any;
            navigationPanel: any;
            modalComment: any;
        }

        /*
         * sm.lUniversity.Params.Config
         */
        export interface Config extends iLayoutStendhal.Params.Config {
        }
    }


    /*
     * sm.lUniversity.Params
     */
    export interface Params {
        data: Params.Data;
        config: Params.Config;
    }
}

