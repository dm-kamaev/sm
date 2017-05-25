"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SubHeader {
    constructor(entityType) {
        this.entityType = entityType;
        this.params = {
            data: {},
            config: {}
        };
    }
    render(data) {
        this.setParams(data);
        return this.getParams();
    }
    setParams(data) {
        this.setLogo_(data.isLogoRedirect);
        this.setLinks(data.listLinks);
        this.setSearch_(data.isSearchRedirect, data.pageAlias);
        this.setFavorites_(data.favoriteEntities);
        this.setConfig_(data.isBottomLine);
    }
    getParams() {
        return this.params;
    }
    setLinks(listLinks) {
        if (listLinks) {
            this.setDropdownLinks(listLinks);
        }
        else {
            this.setLink_();
        }
    }
    setDropdownLinks(links) {
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
    setRowLinks(links) {
        const linksParams = links.map(link => {
            return {
                data: {
                    url: link.url,
                    content: link.label
                },
                config: this.rowLinks.linkConfig
            };
        });
        this.params.data.rowLinks = {
            data: {
                items: linksParams
            },
            config: this.rowLinks.listConfig
        };
    }
    setLogo_(isLogoRedirect) {
        this.params.data.logo = this.logo;
        if (!isLogoRedirect) {
            this.params.data.logo.linkUrl = null;
        }
    }
    setLink_() {
        this.params.data.link = this.link;
    }
    setSearch_(isRedirect, pageAlias) {
        this.params.data.search = this.search;
        this.params.data.search.redirect = isRedirect;
        this.params.data.search.pageAlias = pageAlias || this.search.pageAlias;
    }
    setFavorites_(favoriteEntities) {
        this.params.data.favorites = this.favorites || {};
        this.params.data.favorites.items = favoriteEntities;
    }
    setConfig_(isBottomLine) {
        this.params.config.bottomLine = isBottomLine;
        this.params.config.entityType = this.entityType;
    }
}
exports.SubHeader = SubHeader;
;
