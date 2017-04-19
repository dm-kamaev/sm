import {bSmItem} from '../../../../n-common/b-sm-item/params';
import {bSmButtonLink} from '../../../../n-common/b-sm-button-link/params';
import {bSmPicture} from '../../../../n-common/b-sm-picture/params';

export namespace bSmItemUniversity {
    /*
     * sm.bSmItem.TemplateUniversity.Params
     */
    export namespace Params {
        /*
         * sm.bSmItem.TemplateUniversity.Params.Data
         */
        export interface Data extends bSmItem.Params.Data {
             company?: {
                 abbreviation: string,
                 city: string,
                 name: string
             },
             nicety?: Array<{
                 title: {
                     text: string,
                     textForMobile?: string,
                     selected?: boolean
                 },
                 value?: string
             }>,
             buttonLink?: bSmButtonLink.Params
        }

        /*
         * sm.bSmItem.TemplateUniversity.Params.Config
         */
        export interface Config extends bSmItem.Params.Config {

        }
    }


    /*
     * sm.bSmItem.TemplateUniversity.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}
