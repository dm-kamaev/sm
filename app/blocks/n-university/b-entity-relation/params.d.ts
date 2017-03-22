import {bSmButtonLink} from '../../n-common/b-sm-button-link/params';

export namespace bEntityRelation {
    /*
     * sm.bEntityRelation.Template.Params
     */
    export namespace Params {
        /*
         * sm.bSummaryBoard.Template.Params.Data
         */
        export interface Data {
            items: Array<{
                data: {
                    content: string
                }
            } | bSmButtonLink.Params>;
        }

        /*
         * sm.bSummaryBoard.Template.Params.Config
         */
        export interface Config {
        }
    }


    /*
     * sm.bSummaryBoard.Template.Params
     */
    export interface Params {
        data: Params.Data;
        config: Params.Config;
    }
}

