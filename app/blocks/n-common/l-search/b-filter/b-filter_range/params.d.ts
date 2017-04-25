import {bFilter} from '../params';

export namespace bFilterRange {
    /**
     * sm.lSearch.bFilterRange.Params
     */
    export namespace Params {
        /**
         * sm.lSearch.bFilterRange.Params.Data
         */
        export interface Data extends bFilter.Params.Data {
            name: string,
            header?: ({
                title: string;
                tooltip?: string;
            }),
            options: Array<{
                label: string;
                name: string;
                value?: number;
                step?: number;
                minValue?: number;
                maxValue: number;
                defaultValue?: number;
                thumb?: {
                    iconName: string;
                    iconType?: string;
                }
            }>
        }

        /**
         * sm.lSearch.bFilterRange.Params.Config
         */
        export interface Config extends bFilter.Params.Config {}
    }


    /**
     * sm.lSearch.bFilterRange.Params
     */
    export interface Params {
        data: Params.Data;
        config: Params.Config;
    }
}
