import {bSmComment} from '../../../n-common/b-sm-comment/params';

export namespace bCommentList {

    export namespace Params {
        /*
         * sm.lUniversity.bCommentList.Params.Data
         */
        export interface Data {
            header: string,
            list?: {
                items: Array<bSmComment.Params.Data>,
                itemType: string
            }
        }

        /*
         * sm.lUniversity.bCommentList.Params.Config
         */
        export interface Config {
            theme?: string,
            customClasses?: Array<string>,
            countShownItems?: number
        }
    }

    /*
     * sm.lUniversity.bCommentList.Params
     */
    export interface Params {
        data: Params.Data,
        config: Params.Config
    }
}

