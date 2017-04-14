import {bFilter} from '../params';

export namespace bFilterInput {
    /**
     * sm.lSearch.bFilterInput.Params
     */
    export namespace Params {
        /**
         * sm.lSearch.bFilterInput.Params.Data
         */
        export interface Data extends bFilter.Params.Data {
            name: string,
            header?: ({
                title: string;
                tooltip?: string;
            }),
            options: Array<{
                label: string;
                name?: (string|number);
                placeholder?: string;
                value: (string|number|undefined);
                maxLength?: number;
            }>
        }

        /**
         * sm.lSearch.bFilterInput.Params.Config
         */
        export interface Config extends bFilter.Params.Config {}
    }


    /**
     * sm.lSearch.bFilterInput.Params
     */
    export interface Params {
        data: Params.Data;
        config: Params.Config;
    }
}
