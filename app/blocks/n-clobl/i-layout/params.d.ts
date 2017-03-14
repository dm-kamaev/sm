import {
    bSmSubheader
} from '../../n-common/b-sm-subheader/params';

export namespace iLayoutStendhal {
    /*
     * sm.iLayoutStendhal.Params
     */
    export namespace Params {
        /*
         * sm.iLayoutStendhal.Params.Data
         */
        export interface Data {
            openGraph?: (any|undefined),
            seo?: {
                metaTitle?: string,
                metaDescription?: (string|undefined)
            },
            subHeader?: bSmSubheader.Params.Data,
            header?: any,
            sideMenu?: any,
            user?: {
                firstName: (string|undefined),
                lastName: (string|undefined)
            },
            authSocialLinks?: {
                vk: (string|undefined),
                fb: (string|undefined)
            },
            footer?: any
        }

        /*
         * sm.iLayoutStendhal.Params.Config
         */
        export interface Config {
            modifier: string,
            entityType: string,
            page?: string,
            staticVersion: string,
            analyticsId: string,
            experimentId?: string,
            yandexMetrikaId: number,
            domain: string,
            fbClientId: number,
            csrf: string
        }
    }

    /*
     * sm.iLayoutStendhal.Params
     */
    export interface Params {
        data?: Params.Data,
        config?: Params.Config
    }
}

