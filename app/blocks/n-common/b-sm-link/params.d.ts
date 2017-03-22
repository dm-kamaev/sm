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
            url?: string;
            content?: string;
        }

        /*
         * sm.bSmLink.Template.Params.Config
         */
        export interface Config {
            target?: string;
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
        config: Params.Config;
    }
}

