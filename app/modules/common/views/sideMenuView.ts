const Menu = require('../lib/Menu'),
    ContactsGenerator = require('../lib/ContactsGenerator');

import {generalDataView} from './generalDataView';

import {AppConfig} from '../types/layout';
import {UserData} from '../../user/types/user';

import {bSmLink} from '../../../blocks/n-common/b-sm-link/params';
import {bSmContacts} from '../../../blocks/n-common/b-sm-contacts/params';
import {
    gModalSideMenu
} from '../../../blocks/n-clobl/g-modal/g-modal_side-menu/params';


type Params = {
    config: AppConfig;
    user: UserData;
    entityType: string;
};

type FooterItems = {
    contactLinks: Array<bSmLink.Params.Data>,
    copyright: string
};

class SideMenu {
    protected params: gModalSideMenu.Params;

    constructor() {}

    public render(params: Params): gModalSideMenu.Params {
        this.setParams(params);
        return this.getParams();
    }

    protected setParams(params: Params) {
        this.params = {
            data: {
                content: {
                    menuItems: this.getMenuItems_(params),
                    contacts: this.getContacts_(params.entityType),
                    user: params.user,
                    footerItems: {
                        data: this.getFooterItems_()
                    }
                }
            },
            config: {
                entityType: params.entityType
            }
        };
    }

    protected getParams(): gModalSideMenu.Params {
        return this.params;
    }

    private getMenuItems_(params: Params): Array<bSmLink.Params.Data> {
        const menu = new Menu({
            config: params.config,
            entityType: params.entityType
        });

        return menu.params;
    }

    private getContacts_(entityType: string): bSmContacts.Params.Data {
        const data = {
            entityType: entityType
        };

        const contactsGenerator = new ContactsGenerator(data);
        return contactsGenerator.params;
    }

    private getFooterItems_(): FooterItems {
        return {
            contactLinks: generalDataView.getContactLinks(),
            copyright: generalDataView.getCopyright()
        };
    }
};

const sideMenuView = new SideMenu();
export {sideMenuView};
