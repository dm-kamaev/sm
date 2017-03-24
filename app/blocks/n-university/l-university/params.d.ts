import {
    bSmSubheader
} from '../../n-common/b-sm-subheader/params';

import {iLayoutStendhal} from '../../n-clobl/i-layout/params';
import {bSummaryBoard} from '../b-summary-board/params';
import {bEntityRelation} from '../b-entity-relation/params';
import {bSmBanner} from '../../n-common/b-sm-banner/params';
import {bDescriptionList} from './b-description-list/params';
import {bSmItemList} from '../../n-common/b-sm-item-list/params';
import {bSmSubscribeBoard} from '../../n-common/b-sm-subscribe-board/params';
import {bSmRowLinks} from '../../n-common/b-sm-row-links/params';
import {bSmSketch} from '../../n-common/b-sm-sketch/params';
import {bCommentList} from './b-comment-list/params';
import {
    gModalInteraction
} from '../../n-clobl/g-modal/g-modal_interaction/params';

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
                sketch: bSmSketch.Params.Data;
                cutDescription: {
                    cutText?: string,
                    fullText?: string;
                },
                descriptionList: bDescriptionList.Params.Data;
                summaryBoard: bSummaryBoard.Params.Data;
                banner: bSmBanner.Params;
                entityRelation: bEntityRelation.Params;
                similarPrograms?: bSmItemList.Params.Data;
                usefulCourses?: bSmItemList.Params.Data;
                comments?: bCommentList.Params.Data;
            };
            subscribeBoard: bSmSubscribeBoard.Params;
            navigationPanel: bSmRowLinks.Params.Data;
            modalComment: gModalInteraction.Params.Data;
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

