/**
 * @fileoverview Utilities for authorization and unauthorization user
 *
 * This class - singlethon, so it can be called from any place,
 * but must be initialized befor e with user and auth social links.
 */

goog.provide('sm.iAuthorization.Authorization');

goog.require('goog.dom');
goog.require('goog.uri.utils');
goog.require('sm.gAuthSocialModal.TemplateStendhal');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');


goog.scope(function() {



    /**
     * Authorization dealer
     * @extends {goog.ui.Component}
     * @constructor
     */
    sm.iAuthorization.Authorization = function() {


        /**
         * Authorization modal instance. Inits on first call of modal
         * @type {cl.gAuthSocialModal.AuthSocialModal}
         * @private
         */
        this.socialModal_ = null;


        /**
         * Defines whether user logged in
         * @type {boolean}
         * @private
         */
        this.isAuthorized_ = false;

        /**
         * Authorization social links
         * @type {{
         *     vk: ?string,
         *     fb: ?string
         * }}
         * @private
         */
        this.authSocialLinks_ = {
            vk: null,
            fb: null
        };


        /**
         * Url of api, which make unauthorize action
         * @type {string}
         * @private
         */
        this.unauthorizeUrl_ = '/unauthorize';

    };
    goog.addSingletonGetter(sm.iAuthorization.Authorization);
    var Authorization = sm.iAuthorization.Authorization;


    var Factory = sm.iNewFactory.FactoryStendhal.INSTANCE;


    /**
     * @typedef {{
     *     isUserAuthorized: boolean,
     *     authSocialLinks: {
     *         fb: (string|undefined),
     *         vk: (string|undefined)
     *     },
     *     factoryType: string
     * }}
     */
    sm.iAuthorization.Authorization.InitParams;


    /**
     * Detect whether user authorized
     * @param {{
     *     firstName: (string|undefined),
     *     lastName: (string|undefined)
     * }} userObject
     * @return {boolean}
     */
    Authorization.detectIsAuthorized = function(userObject) {
        return !!(userObject.firstName || userObject.lastName);
    };


    /**
     * Init authorization params
     * @param {sm.iAuthorization.Authorization.InitParams} params
     */
    Authorization.prototype.init = function(params) {
        this.isAuthorized_ = params.isUserAuthorized;

        this.authSocialLinks_.fb = params.authSocialLinks.fb;
        this.authSocialLinks_.vk = params.authSocialLinks.vk;
    };


    /**
     * Make login action
     */
    Authorization.prototype.authorize = function() {
        this.showAuthorizationModal_();
    };


    /**
     * Generate origin address and redirect to unauthorize url
     * with origin option
     */
    Authorization.prototype.unauthorize = function() {
        var redirectPath = goog.uri.utils.buildQueryDataFromMap({
                'origin': this.generateCurrentUrl_()
            });

        window.location.replace(this.unauthorizeUrl_ + '?' + redirectPath);
    };


    /**
     * Return whether user authorized or not
     * @return {boolean}
     */
    Authorization.prototype.isUserAuthorized = function() {
        return this.isAuthorized_;
    };


    /**
     * Render modal if necessary and show it
     * @private
     */
    Authorization.prototype.showAuthorizationModal_ = function() {
        if (!this.socialModal_) {
            this.initSocialModal_();
        }

        this.socialModal_.show();
    };


    /**
     * init Social Modal
     * @private
     */
    Authorization.prototype.initSocialModal_ = function() {
        var params = {
            data: {
                socials: [
                    {
                        type: 'fb',
                        url: this.authSocialLinks_.fb
                    },
                    {
                        type: 'vk',
                        url: this.authSocialLinks_.vk
                    }
                ]
            }
        };

        this.socialModal_ = Factory.render(
            sm.gAuthSocialModal.TemplateStendhal.NAME(),
            goog.dom.getDocument().body,
            params
        );
    };


    /**
     * Generate origin address
     * @return {string}
     * @private
     */
    Authorization.prototype.generateCurrentUrl_ = function() {
        var location = document.location.href;

        var currentPath = goog.uri.utils.getPath(location),
            currentQueryParams = goog.uri.utils.getQueryData(location);

        return currentQueryParams ?
            currentPath + '?' + currentQueryParams :
            currentPath;
    };
});  // goog.scope
