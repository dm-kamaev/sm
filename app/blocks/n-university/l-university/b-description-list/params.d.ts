import {bSmLink} from '../../../n-common/b-sm-link/params';

export namespace bDescriptionList {
    /*
     * sm.lUniversity.bDescriptionList.Template.Params
     */
    export namespace Params {
        /*
         * sm.lUniversity.bDescriptionList.Template.Params.Data
         */
        export interface Data {
            items: Array<{
                data: {
                    header: string,
                    subitems: Array<string | bSmLink.Params.Data>
                },
                config: {
                    inline?: boolean
                }
            }>;
        }

        /*
         * sm.lUniversity.bDescriptionList.Template.Params.Config
         */
        export interface Config {
        }
    }


    /*
     * sm.lUniversity.bDescriptionList.Template.Params
     */
    export interface Params {
        data: Params.Data;
        config: Params.Config;
    }
}

