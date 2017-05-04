import {bSmItem} from '../params';

export namespace bSmItemCompact {
    /*
     * sm.bSmItemCompact.Template.Params
     */
    export namespace Params {
        /*
         * sm.bSmItemCompact.Template.Params.Data
         * sm.bSmItemCompact.Params.Data
         */
        export interface Data extends bSmItem.Params.Data {
            descriptionLink?: {
                content:string;
                url: string;
            }
            nameLinkUrl: string;
            placeholder?: {
                url: string;
            };
        }

        /*
         * sm.bSmItemCompact.Template.Params.Config
         * sm.bSmItemCompact.Params.Config
         */
        export interface Config extends bSmItem.Params.Config {
            nameLinkSize?: string;
            nameLinkTheme: string;
            isLinksInNewTab?: boolean;
        }
    }

    /*
     * sm.bSmItemCompact.Template.Params
     * sm.bSmItemCompact.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}
