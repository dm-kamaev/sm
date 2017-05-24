import {bSmComment} from '../../../n-common/b-sm-comment/params';
import {gButtonStendhal} from '../../../n-clobl/g-button/params';

export namespace bCommentList {

    export namespace Params {
        /*
         * sm.lUniversity.bCommentList.Params.Data
         */
        export interface Data {
            header: string;
            leaveCommentButton: gButtonStendhal.Params.Data;
            list?: {
                items: Array<bSmComment.Params.Data>,
                itemType: string
            };
        }

        /*
         * sm.lUniversity.bCommentList.Params.Config
         */
        export interface Config {
            theme?: string;
            customClasses?: Array<string>;
            countShownItems?: number;
        }
    }

    /*
     * sm.lUniversity.bCommentList.Params
     */
    export interface Params {
        data: Params.Data;
        config: Params.Config;
    }
}

