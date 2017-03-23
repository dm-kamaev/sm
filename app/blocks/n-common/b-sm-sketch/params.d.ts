export namespace bSmSketch {
    /*
     * sm.bSmSketch.Params
     */
    export namespace Params {
        /*
         * sm.bSmSketch.Params.Data
         */
        export interface Data {
            description: string;
            image: {
                url: string,
                altText: string
            };
            button: {
                data: {
                    content: string
                },
                config?: {
                    theme?: string,
                    borderRoundSize?: string
                }
            };
        }

        /*
         * sm.bSmSketch.Params.Config
         */
        export interface Config {
            theme?: string;
        }
    }

    /*
     * sm.bSmSketch.Template.Template.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}
