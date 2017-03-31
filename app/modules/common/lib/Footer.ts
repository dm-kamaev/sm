const ContactsGenerator = require('./ContactsGenerator.js');

import {generalDataView} from '../views/generalDataView';

import {bSmFooter} from '../../../blocks/n-common/b-sm-footer/params';
import {bSmLink} from '../../../blocks/n-common/b-sm-link/params';
import {bSmHeadedList} from '../../../blocks/n-common/b-sm-headed-list/params';
import {bSmItemList} from '../../../blocks/n-common/b-sm-item-list/params';



abstract class Footer {

    protected params: bSmFooter.Params;

    protected config: {
        theme?: string,
        contactLinks?: boolean
    };

    protected copyright: string;

    protected contactLinks: Array<bSmLink.Params.Data>;

    protected seoLinks: Array<bSmLink.Params.Data>;

    protected columnList: {
        items: Array<{
            label?: string,
            links: Array<bSmLink.Params.Data>,
            linksConfig: any,
            type: string
        }>,
        theme?: string
    };

    protected logotypes: Array<{
        type: string,
        url?: string
    }>;

    constructor() {
        this.params = {
            data: {},
            config: {}
        };
    }

    public render(): bSmFooter.Params {
        this.setParams();
        return this.getParams();
    }

    protected setParams() {
        this.setCopyright_();

        if (this.config.contactLinks) {
            this.setContactLinks_();
        }

        this.setSeoLinks_();
        this.setColumnList_();
        this.setLogotypes_();
        this.setConfig_();
    }


    protected getParams(): bSmFooter.Params {
        return this.params;
    }

    private setCopyright_() {
        this.params.data.copyright =
            this.copyright || generalDataView.getCopyright();
    }

    private setContactLinks_() {
        this.params.data.contactLinks =
            this.contactLinks || generalDataView.getContactLinks();
    }

    private setSeoLinks_() {
        this.params.data.seoLinks = this.seoLinks;
    }

    private setLogotypes_() {
        this.params.data.logotypes = this.logotypes;
    }

    private setConfig_() {
        this.params.config = this.config;
    }

    private setColumnList_() {
        this.params.data.columnList =
            this.columnList.items
                .map(column => column.type == 'smHeadedList' ?
                    this.setHeadedList(column) :
                    this.setItemList(column)
                );
    }

    private setHeadedList(column): bSmHeadedList.Params {
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

    private setItemList(column): bSmItemList.Params {
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
};

export {Footer};
