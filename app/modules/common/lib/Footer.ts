const ContactsGenerator = require('./ContactsGenerator.js');

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
        this.setCopyright();

        if (this.config.contactLinks) {
            this.setContactLinks();
        }

        this.setSeoLinks();
        this.setColumnList();
        this.setLogotypes();
        this.setConfig();
    }


    protected getParams(): bSmFooter.Params {
        return this.params;
    }

    private setCopyright() {
        this.params.data.copyright =
            this.copyright || `© Маркет Мела ${new Date().getFullYear()}`;
    }

    private setContactLinks() {
        this.params.data.contactLinks = [{
            content: 'Сотрудничество',
            url: 'mailto:vs@mel.fm'
        }, {
            content: 'Пользовательское соглашение',
            url: 'http://mel.fm/terms-of-use'
        }];
    }

    private setSeoLinks() {
        this.params.data.seoLinks = this.seoLinks;
    }

    private setLogotypes() {
        this.params.data.logotypes = this.logotypes;
    }

    private setConfig() {
        this.params.config = this.config;
    }

    private setColumnList() {
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
