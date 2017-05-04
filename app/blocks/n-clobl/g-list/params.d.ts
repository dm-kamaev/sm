export namespace gList {
    /*
     * sm.gList.Content
     */


    export namespace Params {
        /*
         * sm.gList.Params.Item
         */
        export interface Item {
            label?: string;
            value?: (string|number);
            url?: string;
            isSelected?: boolean;
            isDisabled?: boolean;
        }

        /*
         * sm.gList.Params.Data
         */
        export interface Data {
            items: Item[];
            selectedItemId?: number;
        }

        /*
         * sm.gList.Params.Config
         */
        export interface Config {
            theme?: string;
            size?: string;
            mode?: ('selection'|'multiselection');
            maxSelection?: number;
        }
    }

    /*
     * sm.gList.Params
     */
    export interface Params {
        data: Params.Data;
        config: Params.Config;
    }
}
