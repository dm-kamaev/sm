import {
    bSmSubheader
} from '../../n-common/b-sm-subheader/params';
import {bSearchResults} from '../../n-common/l-search/b-search-results/params';
import {
    bFilterPanel
} from '../../n-common/l-search/b-filter-panel/params';

import {iLayoutStendhal} from '../../n-clobl/i-layout/params';

export namespace lSearchUniversity {
    /**
     * sm.lSearch.ParamsUniversity
     */
    export namespace Params {
        interface EgeResult {
            subjectId: number;
            value: number;
        }

        /**
         * sm.lSearch.ParamsUniversity.Data.SearchParams
         */
        export interface SearchParams {
            cities: number[];
            egeSubjects: number[];
            payType: number[];
            egeResults: EgeResult[];
            maxPrice: number[];
            majors: number[];
            features: number[];
            page: number;
            sortType: number;
        }

        /**
         * sm.lSearch.ParamsUniversity.Data
         */
        export interface Data extends iLayoutStendhal.Params.Data {
            resultsList: bSearchResults.Params.Data;
            filterPanel: bFilterPanel.Params;
            dependentFilterPanel: bFilterPanel.Params;
            searchParams: SearchParams;
            api: {
                search: string;
            }
        }

        /**
         * sm.lSearch.ParamsUniversity.Config
         */
        export interface Config extends iLayoutStendhal.Params.Config {
        }
    }


    /**
     * sm.lSearch.ParamsUniversity
     */
    export interface Params {
        data: Params.Data;
        config: Params.Config;
    }
}

