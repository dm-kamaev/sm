import {
    Data as gDropdownSelectParamsData
} from '../../n-clobl/g-dropdown/g-dropdown_select/params';

declare namespace Params {
    /*
     * sm.bSmSubheader.Params.Data
     */
    interface Data {
        logo: {
            imgUrl: string,
            altText?: string,
            linkUrl?: string
        },
        listLinks: gDropdownSelectParamsData,
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
    interface Config {
        entityType: string,
        bottomLine?: boolean,
        theme: (string|undefined),
        stylizationModifier: string
    }

    /*
     * sm.bSmSubheader.Params
     */
    interface Params {
        data: Data;
        config: Config;
    }
}

export = Params;
