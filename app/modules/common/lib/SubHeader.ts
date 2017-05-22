import {bSmSubheader} from '../../../blocks/n-common/b-sm-subheader/params';
import {
    gDropdownListLinks
} from '../../../blocks/n-clobl/g-dropdown/g-dropdown_list-links/params';
import {bSmRowLinks} from '../../../blocks/n-common/b-sm-row-links/params';
import {bSmLink} from '../../../blocks/n-common/b-sm-link/params';


type Data = {
    isLogoRedirect?: boolean,
    listLinks?: Array<{[index: string]: string}>,
    isSearchRedirect?: boolean,
    pageAlias: string,
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

    protected dropdownLinks: gDropdownListLinks.Params;

    protected rowLinks: {
        linkConfig?: bSmLink.Params.Config,
        listConfig?: bSmRowLinks.Params.Config
    };

    protected link: {
        nameL: string,
        nameM: string,
        nameS?: string,
        url: string,
        theme?: string
    };

    protected search: {
        placeholder: string;
        pageAlias: string;
        redirect: boolean;
        sourceUrl?: string;
        disableSearchBehavior?: boolean;
    };

    protected favorites: {
        items: Array<{[index: string]: string}>
    };

    protected params: bSmSubheader.Params;

    constructor(entityType: string) {
        this.entityType = entityType;

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
        this.setLinks(data.listLinks);

        this.setSearch_(data.isSearchRedirect, data.pageAlias);
        this.setFavorites_(data.favoriteEntities);

        this.setConfig_(data.isBottomLine);
    }


    protected getParams(): bSmSubheader.Params {
        return this.params;
    }


    protected setLinks(listLinks) {
        if (listLinks) {
            this.setDropdownLinks(listLinks);
        } else {
            this.setLink_();
        }
    }


    protected setDropdownLinks(links) {
        const data = this.dropdownLinks.data || {};
        data.content = data.content || {};
        data.content.items = links;

        const config = this.dropdownLinks.config || {};
        config.openerSize = config.openerSize || 'xl';
        config.contentSize = config.contentSize || 'l';

        this.params.data.dropdownLinks = {
            data: data,
            config: config
        };
    }


    protected setRowLinks(links) {
        const linksParams = links.map(link => {
            return {
                data: {
                    url: link.url,
                    content: link.label
                },
                config: this.rowLinks.linkConfig
            };
        });

        this.params.data.rowLinks  = {
            data: {
                items: linksParams
            },
            config:  this.rowLinks.listConfig
        };
    }


    private setLogo_(isLogoRedirect) {
        this.params.data.logo = this.logo;

        if (!isLogoRedirect) {
            this.params.data.logo.linkUrl = null;
        }
    }


    private setLink_() {
        this.params.data.link = this.link;
    }


    private setSearch_(isRedirect, pageAlias) {
        this.params.data.search = this.search;

        this.params.data.search.redirect = isRedirect;
        this.params.data.search.pageAlias = pageAlias || this.search.pageAlias;
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

export {SubHeader, Data};
