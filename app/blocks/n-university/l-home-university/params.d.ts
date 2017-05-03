import {
    bSmSubheader
} from '../../n-common/b-sm-subheader/params';

import {iLayoutStendhal} from '../../n-clobl/i-layout/params';

export namespace lHomeUniversity {
    /**
     * sm.lHomeUniversity.Params
     */
    export namespace Params {

        /**
         * sm.lHomeUniversity.Params.Data
         */
        export interface Data extends iLayoutStendhal.Params.Data {
            searchPanel: Object;
            populars: Object;
            articles: Object;
        }

        /**
         * sm.lHomeUniversity.Params.Config
         */
        export interface Config extends iLayoutStendhal.Params.Config {
        }
    }


    /**
     * sm.lHomeUniversity.Params
     */
    export interface Params {
        data: Params.Data;
        config: Params.Config;
    }
}

