import {bSmPicture} from '../b-sm-picture/params';

export namespace bSmItem {
    interface BadgeItem {
        id: number;
        name: string;
    }

    /*
     * sm.bSmItem.Template.Params
     */
    export namespace Params {
        /*
         * sm.bSmItem.Template.Params.Data
         * sm.bSmItem.Params.Data
         */
        export interface Data {
            id: number;
            type: string;
            name: {
                light?: string,
                bold?: string
            }
            picture?: bSmPicture.Params.Data;
            alias?: string;
            score?: number;
            description?: (string|Array<string>);
            metro?: BadgeItem[];
            area?: BadgeItem[];
            category?: string;
            url?: string;
        }

        /*
         * sm.bSmItem.Template.Params.Config
         * sm.bSmItem.Params.Config
         */
        export interface Config {
            enableCover?: boolean;
            stylizationModifier?: boolean;
            theme?: string;
            nameLinkSize?: string;
            isDescriptionLink?: string;
        }
    }

    /*
     * sm.bSmItem.Template.Params
     * sm.bSmItem.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}
