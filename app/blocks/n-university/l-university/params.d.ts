import {
    bSmSubheader
} from '../../n-common/b-sm-subheader/params';

import {iLayoutStendhal} from '../../n-clobl/i-layout/params';

export namespace lUniversity {
    /*
     * sm.lUniversity.Params
     */
    export namespace Params {
        /*
         * sm.lUniversity.Params.Data
         */
        export interface Data {
            openGraph: (any|undefined),
            seo: {
                metaTitle: string,
                metaDescription: (string|undefined)
            },
            subHeader: bSmSubheader.Params,
            header: any,
            sideMenu: any,
            user?: {
                firstName: (string|undefined),
                lastName: (string|undefined)
            },
            authSocialLinks: {
                vk: (string|undefined),
                fb: (string|undefined)
            },
            entityData: any,
            subscribeBoard: any,
            navigationPanel: any,
            modalComment: any,
            footer: any
        }

        /*
         * sm.lUniversity.Params.Config
         */
        export interface Config extends iLayoutStendhal.Params.Config {
        }
    }


    /*
     * sm.lUniversity.Params
     */
    export interface Params {
        data: Params.Data,
        config: Params.Config
    }
}

