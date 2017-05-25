"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Menu = require('./Menu'), ContactsGenerator = require('./ContactsGenerator');
class Header {
    constructor() {
        this.params = {
            data: {},
            config: {}
        };
    }
    render(params) {
        this.setParams(params);
        return this.getParams();
    }
    setParams(params) {
        this.setContacts_(params.entityType);
        this.setMenuItems_(params);
        this.setUser_(params.user);
        this.setConfig_(params.entityType);
    }
    getParams() {
        return this.params;
    }
    setContacts_(entityType) {
        const data = {
            entityType: this.entityType || entityType
        };
        const contactsGenerator = new ContactsGenerator(data);
        this.params.data.contacts = contactsGenerator.params;
    }
    setMenuItems_(params) {
        const menuData = {
            entityType: this.entityType || params.entityType,
            config: params.config
        };
        const menu = new Menu(menuData);
        this.params.data.menuItems = menu.params;
    }
    setUser_(user) {
        this.params.data.user = user;
    }
    setConfig_(entityType) {
        this.params.config.entityType = this.entityType || entityType;
    }
}
exports.Header = Header;
