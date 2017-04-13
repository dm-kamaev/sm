import {bSmInformationCard} from '../b-sm-information-card/params';

export namespace bSmItemList {
    /*
     * sm.bSmItemList.Template.Params
     */
    export namespace Params {
        /*
         * sm.bSmItemList.Template.Params.Data
         * sm.bSmItemList.Params.Data
         */
        export interface Data {
            items: any[] | bSmInformationCard.Params.Data[];
            itemType: string;
            countItemsPerPage?: number;
            itemConfig?: any | bSmInformationCard.Params.Config;
        }

        /*
         * sm.bSmItemList.Template.Params.Config
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

    /*
     * sm.bSmItemList.Template.Params
     * sm.bSmItemList.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}
