import {bFilter} from '../b-filter/params';

export namespace bFilterPanel {
    /**
     * sm.lSearch.bFilterPanel.Params
     */
    export namespace Params {
        /**
         * sm.lSearch.bFilterPanel.Params.Data
         */
        export interface Data {
            filters: Array<(bFilter.Params|any)>
        }

        /**
         * sm.lSearch.bFilterPanel.Params.Config
         */
        export interface Config {
            hasCheckedFilters?: boolean,
            theme?: string;
            customClasses?: Array<string>;
            stylizationModifier?: string;
        }
    }


    /**
     * sm.lSearch.bFilterPanel.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}
