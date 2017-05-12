import {bFilter} from '../../../n-common/l-search/b-filter/params';
import {gList} from '../../../n-clobl/g-list/params';

export namespace bSearchPanel {
    /**
     * sm.bSearchPanelUniversity.Params
     */
    export namespace Params {
        /**
         * sm.bSearchPanelUniversity.Params.Data
         */
        export interface Data {
            title?: string;
            urlRedirect?: string;
            searchCity?: any;
            payType?: {
                content?: gList.Params.Item[],
                contentConfig?: gList.Params.Config
            };
            ege?: bFilter.Params.Data;
            button?: {
                content: string;
                theme?: string;
                borderRoundSize?: string;
                size?: string;
            };
        }

        /**
         * sm.bSearchPanelUniversity.Params.Config
         */
        export interface Config {
            theme?: string;
            customClasses?: string[];
            checkboxIcon?: any;
            optionsTheme?: string;
        }
    }


    /**
     * sm.bSearchPanelUniversity.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}
