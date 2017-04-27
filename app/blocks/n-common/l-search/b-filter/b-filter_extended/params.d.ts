import {bFilter} from '../params';

import {bSmCheckbox} from '../../../b-sm-checkbox/params';

export namespace bFilterExtended {
    /**
     * sm.lSearch.bFilterExtended.Params
     */
    export namespace Params {
        /**
         * sm.lSearch.bFilterExtended.Params.Data
         */
        export interface Data extends bFilter.Params.Data {
            name: string;
            header?: ({
                title: string;
                tooltip?: string;
            });
            options: bSmCheckbox.Params.Data[];
            api: string;
            apiPopular?: string;
            modal?: {
                header?: string;
                placeholder?: string;
                filterHeader?: string;
                theme?: string;
            };
        }

        /**
         * sm.lSearch.bFilterExtended.Params.Config
         */
        export interface Config extends bFilter.Params.Config {}
    }


    /**
     * sm.lSearch.bFilterExtended.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}
