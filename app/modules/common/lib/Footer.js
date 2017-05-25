"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ContactsGenerator = require('./ContactsGenerator.js');
const generalDataView_1 = require("../views/generalDataView");
class Footer {
    constructor() {
        this.params = {
            data: {},
            config: {}
        };
    }
    render() {
        this.setParams();
        return this.getParams();
    }
    setParams() {
        this.setCopyright_();
        if (this.config.contactLinks) {
            this.setContactLinks_();
        }
        this.setSeoLinks_();
        this.setColumnList_();
        this.setLogotypes_();
        this.setConfig_();
    }
    getParams() {
        return this.params;
    }
    setCopyright_() {
        this.params.data.copyright =
            this.copyright || generalDataView_1.generalDataView.getCopyright();
    }
    setContactLinks_() {
        this.params.data.contactLinks =
            this.contactLinks || generalDataView_1.generalDataView.getContactLinks();
    }
    setSeoLinks_() {
        this.params.data.seoLinks = this.seoLinks;
    }
    setLogotypes_() {
        this.params.data.logotypes = this.logotypes;
    }
    setConfig_() {
        this.params.config = this.config;
    }
    setColumnList_() {
        this.params.data.columnList =
            this.columnList.items
                .map(column => column.type == 'smHeadedList' ?
                this.setHeadedList(column) :
                this.setItemList(column));
    }
    setHeadedList(column) {
        return {
            data: {
                header: {
                    label: column.label
                },
                list: {
                    items: column.links,
                    itemType: 'smLink',
                    countItemsPerPage: column.links.length,
                    itemConfig: column.linksConfig
                }
            },
            config: {
                theme: this.columnList.theme
            }
        };
    }
    setItemList(column) {
        return {
            data: {
                items: column.links,
                itemType: 'smLink',
                countItemsPerPage: column.links.length,
                itemConfig: column.linksConfig
            },
            config: {
                theme: this.columnList.theme
            }
        };
    }
}
exports.Footer = Footer;
;
