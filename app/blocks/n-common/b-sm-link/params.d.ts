export namespace bSmLink {
    /*
     * sm.bSmLink.Template.Params
     */
    export namespace Params {
        /*
         * sm.bSmLink.Template.Params.Data
         */
        export interface Data {
            id?: number;
            url?: (string|undefined);
            content?: (string|undefined);
        }

        /*
         * sm.bSmLink.Template.Params.Config
         */
        export interface Config {
            target?: (string|undefined);
            disableHover?: boolean;
            size?: string;
            theme?: string;
            isSelected?: boolean;
        }
    }


    /*
     * sm.bSmLink.Template.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}
