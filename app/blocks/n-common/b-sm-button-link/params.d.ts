export namespace bSmButtonLink {
    /*
     * sm.bSmButtonLink.Template.Params
     */
    export namespace Params {
        /*
         * sm.bSmCollapsedText.Template.Params.Data
         */
        export interface Data {
            id?: number;
            url?: string;
            icon?: string;
            iconType?: string;
            content?: string;
        }

        /*
         * sm.bSmButtonLink.Template.Params.Config
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

