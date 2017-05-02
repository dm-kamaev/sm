export namespace bSmHeadedList {
    /**
     * sm.bSmHeadedList.Params
     */
    export namespace Params {
        /**
         * sm.bSmHeadedList.Params.Data
         */
        export interface Data {
            header: {
                label?: string;
                img?: {
                    url: string;
                    altText?: string;
                }
            };
            list: any;
        }


        /**
         * sm.bSmHeadedList.Params.Config
         */
        export interface Config {
            theme?: string;
        }
    }

    /**
     * sm.bSmHeadedList.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}

