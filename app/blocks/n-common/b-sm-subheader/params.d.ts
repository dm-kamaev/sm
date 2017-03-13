import {
    gDropdownSelect
} from '../../n-clobl/g-dropdown/g-dropdown_select/params';

export namespace bSmSubheader {
    /*
     * sm.bSmSubheader.Params
     */
    export namespace Params {
        /*
         * sm.bSmSubheader.Params.Data
         */
        export interface Data {
            logo: {
                imgUrl: string,
                altText?: string,
                linkUrl?: string
            },
            listLinks: gDropdownSelect.Params.Data,
            contacts: any,
            links: ({
                nameL: string,
                nameM: string,
                nameS: (string|undefined),
                url: string,
                theme: (string|undefined)
            }|undefined),
            search: {
                placeholder: (string|undefined),
                redirect: boolean,
                pageAlias: string
            },
            user?: {
                firstName: (string|undefined),
                lastName: (string|undefined)
            },
            favorites: any
        }

        /*
         * sm.bSmSubheader.Params.Config
         */
        export interface Config {
            entityType: string,
            bottomLine?: boolean,
            theme: (string|undefined),
            stylizationModifier: string
        }
    }
}

