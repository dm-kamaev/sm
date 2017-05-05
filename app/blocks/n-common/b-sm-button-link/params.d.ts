export namespace bSmButtonLink {
    /*
     * sm.bSmButtonLink.Params
     */
    export namespace Params {
        /*
         * sm.bSmCollapsedText.Params.Data
         */
        export interface Data {
            id?: number;
            url?: string;
            icon?: string;
            iconType?: string;
            content?: string;
        }

        /*
         * sm.bSmButtonLink.Params.Config
         */
        export interface Config {
            disableHover?: boolean;
            size?: string;
            theme?: string;
            borderRoundSize?: string;
        }
    }

    /*
     * sm.bSmButtonLink.Params
     */
    export interface Params {
        data?: Params.Data;
        config?: Params.Config;
    }
}

