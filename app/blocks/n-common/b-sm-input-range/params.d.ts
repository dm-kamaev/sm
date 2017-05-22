export namespace bSmInputRange {
    /*
     * sm.bSmInputRange.Params
     */
    export namespace Params {
        /*
         * sm.bSmInputRange.Params.Data
         */
        export interface Data {
            name?: string;
            value?: number;
            minValue: number;
            maxValue: number;
            defaultValue?: number;
            step?: number;
            thumb?: {
                iconName: string;
                iconType?: string;
            }
        }

        /*
         * sm.bSmInputRange.Params.Config
         */
        export interface Config {
            theme?: string;
            customClasses?: Array<string>;
        }
    }

    /*
     * sm.bSmInputRange.Params
     */
    export interface Params {
        data: Params.Data;
        config: Params.Config
    }
}
