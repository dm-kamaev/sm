import {bSmLink} from '../b-sm-link/params';

export namespace bSmRowLinks {
    /**
     * sm.bSmRowLinks.Template.Params
     */
    export namespace Params {
        /**
         * sm.bSmRowLinks.Template.Params.Data
         */
        export interface Data {
            items: Array<bSmLink.Params>;
        }

        /**
         * sm.bSmRowLinks.Template.Params.Config
         */
        export interface Config {
            theme?: string;
            size?: string;
        }
    }

    /**
     * sm.bSmSubscribeBoard.Template.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}
