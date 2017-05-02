export namespace bSmSwitch {
    /*
     * sm.bSmSwitch.Params
     */
    export namespace Params {
        /*
         * sm.bSmSwitch.Params.Data
         */
        export interface Data {
            items: Array<{
                label: string,
                value?: (string|number),
                url?: string
                }>;
            selectedItemId?: number;
        }

        /*
         * sm.bSmSwitch.Params.Config
         */
        export interface Config {
            theme?: string;
            size?: string;
            linksTheme?: string;
        }
    }

    /*
     * sm.bSmSwitch.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}
