import {bSmLink} from '../b-sm-link/params';

export namespace bSmRowLinks {
    /*
     * sm.bSmRowLinks.Params
     */
    export namespace Params {
        /*
         * sm.bSmRowLinks.Params.Data
         */
        export interface Data {
            items: bSmLink.Params
        }

        /*
         * sm.bSmRowLinks.Params.Config
         */
        export interface Config {
            theme?: string,
            size?: string
        }
    }

    /*
     * sm.bSmRowLinks.Params
     */
    export interface Params {
        data: Params.Data,
        config?: Params.Config
    }
}
