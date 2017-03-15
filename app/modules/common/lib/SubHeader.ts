const ContactsGenerator = require('./ContactsGenerator.js');

import {bSmSubheader} from '../../../blocks/n-common/b-sm-subheader/params';
import {UserData} from '../../user/types/user';


type Data = {
    isLogoRedirect?: boolean,
    listLinks?: Array<{[index: string]: string}>,
    logoRedirectUrl?: string,
    isSearchRedirect?: boolean,
    pageAlias: string,
    user: UserData,
    favoriteEntities: Array<{string: any}>,
    isBottomLine?: boolean
};

abstract class SubHeader {
    protected entityType: string;

    protected logo: {
        altText?: string,
        linkUrl?: string,
        imgUrl: string
    };

    protected listLinks: {
        opener?: string,
        content: ({
            items: Array<{[index: string]: string}>
        }|undefined)
    };

    protected links: {
        nameL: string,
        nameM: string,
        nameS?: string,
        url: string,
        theme?: string
    };

    protected search: {
        placeholder: string,
        pageAlias: string,
        redirect: boolean
    };

    protected favorites: {
        items: Array<{[index: string]: string}>
    };

    protected params: bSmSubheader.Params;

    constructor() {
        this.params = {
            data: {},
            config: {}
        };
    }

    public render(data: Data): bSmSubheader.Params {
        this.setParams(data);
        return this.getParams();
    }


    protected setParams(data: Data) {
        this.setLogo_(data.isLogoRedirect);
        this.setContacts_();

        if (data.listLinks) {
            this.setListLinks_(data.listLinks);
        } else {
            this.setLinks_(data.logoRedirectUrl);
        }

        this.setSearch_(data.isSearchRedirect, data.pageAlias);
        this.setUser_(data.user);
        this.setFavorites_(data.favoriteEntities);

        this.setConfig_(data.isBottomLine);
    }


    protected getParams(): bSmSubheader.Params {
        return this.params;
    }


    private setLogo_(isLogoRedirect) {
        this.params.data.logo = this.logo;

        if (!isLogoRedirect) {
            this.params.data.logo.linkUrl = null;
        }
    }


    private setContacts_() {
        const data = {
            entityType: this.entityType
        };

        const contactsGenerator = new ContactsGenerator(data);
        this.params.data.contacts = contactsGenerator.params;
    }


    private setListLinks_(links) {
        this.params.data.listLinks = this.listLinks;

        this.params.data.listLinks.content = {};
        this.params.data.listLinks.content.items = links;
    }


    private setLinks_(url) {
        this.params.data.links = this.links;

        if (url) {
            this.params.data.links.url = url;
        }
    }


    private setSearch_(isRedirect, pageAlias) {
        this.params.data.search = this.search;

        this.params.data.search.redirect = isRedirect;
        this.params.data.search.pageAlias = pageAlias || this.search.pageAlias;
    }


    private setUser_(user) {
        this.params.data.user = user;
    }


    private setFavorites_(favoriteEntities) {
        this.params.data.favorites = this.favorites || {};

        this.params.data.favorites.items = favoriteEntities;
    }


    private setConfig_(isBottomLine) {
        this.params.config.bottomLine = isBottomLine;
        this.params.config.entityType = this.entityType;
    }
};

export {SubHeader};
