"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const headerView = require('../../../../api/modules/entity/views/headerView'), favoriteView = require('../../../../api/modules/favorite/views/favoriteView');
const configView = require('../views/configView');
const SubHeader_1 = require("./SubHeader");
const Header_1 = require("./Header");
const Footer_1 = require("./Footer");
const sideMenuView_1 = require("../views/sideMenuView");
const user_1 = require("../../user/views/user");
class LayoutView {
    constructor(entityType) {
        this.entityType = entityType;
        this.views = {
            header: Header_1.Header,
            subHeader: SubHeader_1.SubHeader,
            sideMenu: sideMenuView_1.sideMenuView,
            favorite: favoriteView,
            footer: Footer_1.Footer
        };
        this.params = {
            data: {}
        };
        this.authSocialLinks_ = {
            vk: '/oauth/vk',
            fb: '/oauth/fb'
        };
    }
    render(params) {
        this.initUser_(params.requestData);
        this.setParams(params);
        return this.getParams();
    }
    setParams(params) {
        this.setOpenGraph(params.config, params.data);
        this.setSeo(params.data);
        this.setHeader_(params.config);
        this.setSubHeader_(params.data);
        this.setUser_();
        this.setAuthSocialLinks_();
        this.setSideMenu_(params.config);
        this.setFooter_();
        this.setConfig_(params.config, params.requestData);
    }
    getParams() {
        return this.params;
    }
    setSeo(data) {
        this.params.data.seo = this.seo;
    }
    setOpenGraph(config, data) {
        this.params.data.openGraph = this.openGraph || {};
        this.params.data.openGraph.fbClientId = config.facebookClientId;
    }
    setHeader_(config) {
        const headerView = new this.views.header();
        this.params.data.header = headerView.render({
            entityType: this.entityType,
            user: this.user_,
            config: config
        });
    }
    setSubHeader_(data) {
        const params = this.subHeader;
        params.user = this.user_;
        params.favoriteEntities = data.favorites ?
            this.views.favorite.list(data.favorites) :
            {};
        const subHeaderView = new this.views.subHeader(this.entityType);
        this.params.data.subHeader = subHeaderView.render(params);
    }
    initUser_(requestData) {
        this.user_ = user_1.userView.render(requestData.user);
    }
    setUser_() {
        this.params.data.user = this.user_;
    }
    setAuthSocialLinks_() {
        this.params.data.authSocialLinks = this.authSocialLinks_;
    }
    setSideMenu_(config) {
        this.params.data.sideMenu = this.views.sideMenu.render({
            config: config,
            user: this.user_,
            entityType: this.entityType
        });
    }
    setFooter_() {
        const footerView = new this.views.footer();
        this.params.data.footer = footerView.render();
    }
    setConfig_(config, requestData) {
        this.params.config = configView.render({
            entityType: this.entityType,
            pageName: this.pageName,
            query: requestData.query,
            csrf: requestData.csrf,
            config: config
        });
    }
}
exports.LayoutView = LayoutView;
