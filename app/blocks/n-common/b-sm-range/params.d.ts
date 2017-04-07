export namespace bSmRange {
    /*
     * sm.bSmRange.Params
     */
    export namespace Params {
        /*
         * sm.bSmRange.Params.Data
         */
        export interface Data {
            name?: string;
            value?: number;
            minValue?: number;
            maxValue: number;
            defaultValue?: number;
            step?: number;
            thumb?: {
                iconName: string;
                iconType?: string;
            }
        }

        /*
         * sm.bSmRange.Params.Config
         */
        export interface Config {
            theme?: string;
            customClasses?: Array<string>;
        }
    }

    /*
     * sm.bSmRange.Params
     */
    export interface Params {
        data: Params.Data;
        config: Params.Config
    }
}
