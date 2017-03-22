export namespace bSummaryBoard {
    /*
     * sm.bSummaryBoard.Template.Params
     */
    export namespace Params {
        /*
         * sm.bSummaryBoard.Template.Params.Data
         */
        export interface Data {
            list: Array<{
                header: string,
                items: Array<{
                    data: {
                        header: string,
                        description: string
                    },
                    config?: {
                        iconType?: string,
                        theme?: string
                    }
                }>
            }>;
            item: {
                data: {
                    header: string,
                    description: string,
                    buttonLink: any
                },
                config?: {
                    theme?: string
                }
            };
        }

        /*
         * sm.bSummaryBoard.Template.Params.Config
         */
        export interface Config {
        }
    }


    /*
     * sm.bSummaryBoard.Template.Params
     */
    export interface Params {
        data: Params.Data;
        config: Params.Config;
    }
}

