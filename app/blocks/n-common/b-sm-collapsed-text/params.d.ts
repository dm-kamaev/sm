export namespace bSmCollapsedText {
    /*
     * sm.bSmCollapsedText.Template.Params
     */
    export namespace Params {
        /*
         * sm.bSmCollapsedText.Template.Params.Data
         */
        export interface Data {
            text: {
                cutText: string,
                fullText: string
            };
            buttonTextExpand: string;
            buttonTextCollapse: string;
        }

        /*
         * sm.bSmCollapsedText.Template.Params.Config
         */
        export interface Config {
            stylizationModifier?: string;
            isButtonCollapse: boolean;
            buttonFont?: string;
            buttonTheme?: string;
            customClasses?: Array<string>;
        }
    }

    /*
     * sm.bSmCollapsedText.Template.Params
     */
    export interface Params {
        data?: Params.Data;
        config?: Params.Config;
    }
}

