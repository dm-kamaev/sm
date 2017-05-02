import {gModalStendhal} from '../params';
import {bSmLink} from '../../../n-common/b-sm-link/params';
import {bSmContacts} from '../../../n-common/b-sm-contacts/params';

export namespace gModalSideMenu {
    export namespace Params {
        /*
         * sm.gModalSideMenu.Params.Data
         * sm.gModal.TemplateSideMenu.Params.Data
         */
        export interface Data extends gModalStendhal.Params.Data {
            content: {
                menuItems: Array<bSmLink.Params.Data>,
                contacts: bSmContacts.Params.Data,
                user?: {
                    firstName: string,
                    lastName: string,
                    photoUrl?: string
                },
                footerItems: {
                    data: {
                        contactLinks: Array<bSmLink.Params.Data>,
                        copyright: string
                    }
                }
            }
        }

        /*
         * sm.gModalSideMenu.Params.Config
         * sm.gModal.TemplateSideMenu.Params.Config
         */
        export interface Config extends gModalStendhal.Params.Config {
            entityType?: string
        }
    }

    /*
     * sm.gModalSideMenu.Params
     * sm.gModal.TemplateSideMenu.Params
     */
    export interface Params {
        data?: Params.Data,
        config?: Params.Config
    }
}

