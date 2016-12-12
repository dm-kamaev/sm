'use strict';

class Subheader {

    /**
     * Init params for subheader
     */
    constructor() {
        /**
         * Data for logo
         * @type {Object<string, string>}
         * @protected
         */
        this.logo = {};


        /**
         * Links data
         * @type {Object<string, (string|Array|Object)>}
         * @protected
         */
        this.listLinks = {
            content: {}
        };


        /**
         * Links data
         * @type {Object<string, string>}
         * @protected
         */
        this.links = {};


        /**
         * Data for search
         * @type {Object<string, string>}
         * @protected
         */
        this.search = {};


        /**
         * Data for favorites
         * @type {Object<string, (string|Array|Object)>}
         * @protected
         */
        this.favorites = {
            items: []
        };


        /**
         * All params subheader
         * @type {{
         *     data: {
         *         logo: Object<string, string>,
         *         contacts: (Object<string, string>|string),
         *         listLinks: (Object<string, (string|Array|Object)>|undefined),
         *         links: (Object<string, string>|undefined),
         *         search: Object<string, string>,
         *         user: ?Object<string, string>,
         *         favorites: ?Object<string, (string|Array|Object)>,
         *     },
         *     config: Object<string, string>
         * }}
         * @protected
         */
        this.params = {
            data: {},
            config: {}
        };
    }


    /**
     * Initializes class
     * @param {{
     *     isLogoRedirect: (boolean|undefined),
     *     contacts: (Object<string, string>|string),
     *     listLinks: Array<string>,
     *     isSearchRedirect: (boolean|undefined),
     *     pageAlias: (string|undefined),
     *     user: Object<string, string>,
     *     favoriteEntities: Object<string, (string|Array|Object)>,
     *     isBottomLine: boolean
     * }} data
     * @public
     */
    init(data) {
        this.setLogo(data.isLogoRedirect);
        this.setContacts(data.contacts);

        if (data.listLinks) {
            this.setListLinks(data.listLinks);
        } else {
            this.setLinks();
        }

        this.setSearch(data.isSearchRedirect, data.pageAlias);
        this.setUser(data.user);
        this.setFavorites(data.favoriteEntities);

        this.setConfig(data.isBottomLine);
    }


    /**
     * Return current params for subheader
     * @return {{
     *     data: Object<string, (string|Array|Object)>,
     *     config: Object<string, (string|Array|Object)>
     * }}
     * @public
     */
    getParams() {
        return this.params;
    }


    /**
     * Logo data setter
     * @param {(boolean|undefined)} isLogoRedirect
     * @public
     */
    setLogo(isLogoRedirect) {
        this.params.data.logo = this.logo;

        if (!isLogoRedirect) {
            this.params.data.logo.linkUrl = null;
        }
    }


    /**
     * Contacts setter
     * @param {(Object<string, string>|string)} contacts
     * @public
     */
    setContacts(contacts) {
        if (contacts) {
            this.params.data.contacts = contacts;
        }
    }


    /**
     * List Links setter
     * @param {Array<string>} links
     * @public
     */
    setListLinks(links) {
        this.params.data.listLinks = this.listLinks;

        this.params.data.listLinks.content.items = links;
    }


    /**
     * Links setter
     * @param {string} url
     * @public
     */
    setLinks(url) {
        this.params.data.links = this.links;

        if (url) {
            this.params.data.links.url = url;
        }
    }


    /**
     * Search setter
     * @param {boolean} isRedirect
     * @param {string} pageAlias
     * @public
     */
    setSearch(isRedirect, pageAlias) {
        this.params.data.search = this.search;

        this.params.data.search.redirect = isRedirect;
        this.params.data.search.pageAlias = pageAlias || this.search.pageAlias;
    }


    /**
     * User setter
     * @param {Object<string, string>} user
     * @public
     */
    setUser(user) {
        this.params.data.user = user;
    }


    /**
     * Favorite setter
     * @param {Array<
     *     Object<string, (string|Array|Object)>
     * >} favoriteEntities
     * @public
     */
    setFavorites(favoriteEntities) {
        this.params.data.favorites = this.favorites;

        this.params.data.favorites.items = favoriteEntities;
    }


    /**
     * Config setter
     * @param {boolean} isBottomLine
     * @public
     */
    setConfig(isBottomLine) {
        this.params.config.bottomLine = isBottomLine;
    }
};

module.exports = Subheader;
