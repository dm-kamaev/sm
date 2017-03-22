export namespace bSmItemList {
    /**
     * sm.bSmItemList.Params
     */
    export namespace Params {
        /**
         * sm.bSmItemList.Params.Data
         */
        export interface Data {
            items: Array<any>;
            itemType: string;
            countItemsPerPage?: number;
            itemConfig?: any;
        }


        /**
         * sm.bSmItemList.Params.Config
         */
        export interface Config {
            stylizationModifier?: string;
            customClasses?: Array<string>;
            theme?: string;
            showLine?: boolean;
            countShownItems?: number;
        }
    }

    /**
     * sm.bSmItemList.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}

