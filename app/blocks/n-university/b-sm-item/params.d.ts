import {bSmItem} from '../../n-common/b-sm-item/params';
import {bSmButtonLink} from '../../n-common/b-sm-button-link/params';
import {bSmPicture} from '../../n-common/b-sm-picture/params';

type iconType = 'svg' | 'png';

export namespace bSmItemUniversity {
    /*
     * sm.bSmItemUniversity.Params
     */
    export namespace Params {
        interface Nicety {
            title: {
                textDefault: string;
                textXs?: string;
                selected?: boolean;
            };
            value?: {
                text: string;
                selected?: boolean;
            };
        }

        /*
         * sm.bSmItemUniversity.Params.Data
         */
        export interface Data extends bSmItem.Params.Data {
            company?: {
                abbreviation: string;
                city: string;
                name: string;
            };
            nicety?: Nicety[];
            buttonLink?: bSmButtonLink.Params;
            iconLink?: {
                icon: string;
                link: string;
                type: iconType;
            }
        }

        /*
         * sm.bSmItemUniversity.Params.Config
         */
        export interface Config extends bSmItem.Params.Config {

        }
    }


    /*
     * sm.bSmItemUniversity.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}
