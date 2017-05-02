export namespace bSmPicture {
    /*
     * sm.bSmPicture.Params
     */
    export namespace Params {
        /*
         * sm.bSmPicture.Params.Data
         */
        export interface Data {
            altText: string;
            sources: Array<{
                url: string;
                size: string;
            }>;
        }

        /*
         * sm.bSmPicture.Params.Config
         */
        export interface Config {
            theme?: string;
        }
    }

    /*
     * sm.bSmPicture.Params
     */
    export interface Params {
        data: Params.Data,
        config?: Params.Config
    }
}
