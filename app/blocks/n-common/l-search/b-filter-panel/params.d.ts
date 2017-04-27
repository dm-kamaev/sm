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
            filters: Array<(bFilter.Params|any)>;
            button?: {
                content: string;
                theme?: string;
                borderRoundSize?: string;
            };
        }

        /**
         * sm.lSearch.bFilterPanel.Params.Config
         */
        export interface Config {
            hasCheckedFilters?: boolean;
            theme?: string;
            customClasses?: string[];
            stylizationModifier?: string;
            isMainPanel?: boolean;
            isDependentPanel?: boolean;
            optionsTheme?: string;
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
