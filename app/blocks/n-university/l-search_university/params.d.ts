import {
    bSmSubheader
} from '../../n-common/b-sm-subheader/params';

import {iLayoutStendhal} from '../../n-clobl/i-layout/params';

export namespace lSearchUniversity {
    /**
     * sm.lSearch.ParamsUniversity
     */
    export namespace Params {
        /**
         * sm.lSearch.ParamsUniversity.Data.SearchParams
         */
        export interface SearchParams {
            cities: number[];
            egeSubjects: number[];
            payType: number[];
            egeResults: number[];
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
            resultsList: any;
            filterPanel: Object;
            dependentFilterPanel: Object;
            searchParams: SearchParams;
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

