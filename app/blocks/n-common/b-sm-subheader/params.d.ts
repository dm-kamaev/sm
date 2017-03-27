import {
    gDropdownListLinks
} from '../../n-clobl/g-dropdown/g-dropdown_list-links/params';

import {bSmRowLinks} from '../b-sm-row-links/params';

export namespace bSmSubheader {
    /*
     * sm.bSmSubheader.Params
     */
    export namespace Params {
        /*
         * sm.bSmSubheader.Params.Data
         */
        export interface Data {
            logo?: {
                imgUrl: string,
                altText?: string,
                linkUrl?: string
            },
            rowLinks?: bSmRowLinks.Params,
            dropdownLinks?: gDropdownListLinks.Params,
            link?: ({
                nameL: string,
                nameM: string,
                nameS?: string,
                url: string,
                theme?: string
            }|undefined),
            search?: {
                placeholder?: string,
                redirect: boolean,
                pageAlias: string
            },
            favorites?: any
        }

        /*
         * sm.bSmSubheader.Params.Config
         */
        export interface Config {
            entityType?: string,
            bottomLine?: boolean,
            theme?: (string|undefined),
            stylizationModifier?: string
        }
    }

    /*
     * sm.bSmSubheader.Params
     */
    export interface Params {
        data: Params.Data,
        config: Params.Config
    }
}

