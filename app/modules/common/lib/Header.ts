const Menu = require('../lib/Menu'),
    ContactsGenerator = require('./ContactsGenerator');

import {bSmHeader} from '../../../blocks/n-common/b-sm-header/params';
import {UserData} from '../../user/types/user';
import {AppConfig} from '../types/layout';

type Params = {
    entityType: string,
    user: UserData,
    config: AppConfig
};

class Header {
    protected entityType: string;
    protected params: bSmHeader.Params;

    constructor() {
        this.params = {
            data: {},
            config: {}
        };
    }

    public render(params: Params): bSmHeader.Params {
        this.setParams(params);
        return this.getParams();
    }

    protected setParams(params: Params) {
        this.setContacts_(params.entityType);
        this.setMenuItems_(params);
        this.setUser_(params.user);
    }

    protected getParams(): bSmHeader.Params {
        return this.params;
    }

    private setContacts_(entityType) {
        const data = {
            entityType: this.entityType || entityType
        };

        const contactsGenerator = new ContactsGenerator(data);
        this.params.data.contacts = contactsGenerator.params;
    }

    private setMenuItems_(params) {
        const menuData = {
            entityType: this.entityType || params.entityType,
            config: params.config
        };

        const menu = new Menu(menuData);
        this.params.data.menuItems = menu.params;
    }

    private setUser_(user) {
        this.params.data.user = user;
    }
}

export {Header};
