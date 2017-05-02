import {bSmHeader} from '../../n-common/b-sm-header/params';
import {bSmSubheader} from '../../n-common/b-sm-subheader/params';
import {gModalSideMenu} from '../g-modal/g-modal_side-menu/params';

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
                metaDescription?: string
            },
            subHeader?: bSmSubheader.Params,
            header?: bSmHeader.Params,
            sideMenu?: gModalSideMenu.Params,
            user?: {
                firstName: string,
                lastName: string
            },
            authSocialLinks?: {
                vk: string,
                fb: string
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

