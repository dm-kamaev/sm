import {bSmLink} from '../b-sm-link/params';
import {bSmHeadedList} from '../b-sm-headed-list/params';
import {bSmItemList} from '../b-sm-item-list/params';

export namespace bSmFooter {
    /**
     * sm.bSmFooter.Params
     */
    export namespace Params {
        /**
         * sm.bSmFooter.Params.Data
         */
        export interface Data {
            copyright?: string;
            contactLinks?: Array<bSmLink.Params.Data>;
            seoLinks?: Array<bSmLink.Params.Data>;
            columnList?: Array<bSmHeadedList.Params|bSmItemList.Params>;
            logotypes?: Array<{
                type: string;
                url?: string;
            }>;
        }


        /**
         * sm.bSmFooter.Params.Config
         */
        export interface Config {
            theme?: string;
        }
    }

    /**
     * sm.bSmFooter.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}

