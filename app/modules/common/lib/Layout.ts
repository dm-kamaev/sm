const SubHeader = require('../../../../api/modules/entity/lib/Subheader');

const headerView = require('../../../../api/modules/entity/views/headerView'),
    footerView = require('../../../../api/modules/entity/views/footerView'),
    favoriteView =
            require('../../../../api/modules/favorite/views/favoriteView');

const sideMenuView = require('../views/sideMenuView'),
    configView = require('../views/configView');

import {userView} from '../../user/views/user';

import {iLayoutStendhal} from '../../../blocks/n-clobl/i-layout/params';
import {BackendUser, UserData} from '../../user/types/user';
import {AppConfig} from '../types/layout';

type Params = {
    data: Data,
    config: AppConfig,
    requestData: {
        user: BackendUser,
        csrf: string,
        query: any
    }
};

type Data = {
    favorites: Array<{string: any}>
};

type OpenGraph = {
    url?: string,
    siteName?: string,
    title?: string,
    type?: string,
    description?: string,
    image?: string,
    fbClientId?: number,
    twitterCardType?: string,
    twitterSiteName?: string,
    imageWidth?: string,
    imageHeight?: string,
    relapTag?: string,
    relapImage?: string
};

type Seo = {
    metaTitle?: string,
    metaDescription?: string
};

type SubHeader = {
    user?: UserData,
    favoriteEntities?: Array<{string: any}>,
    listLinks?: Array<string>,
    isLogoRedirect: boolean,
    isSearchRedirect: boolean,
    isBottomLine: boolean
};

type AuthSocialLinks = {
    vk: string,
    fb: string
};

abstract class LayoutView {
    protected views: {
        header: any,
        subHeader: any
    };

    protected entityType: string;
    protected pageName: string;

    protected openGraph?: OpenGraph;
    protected seo?: Seo;
    protected subHeader: SubHeader;

    protected params: iLayoutStendhal.Params;

    private authSocialLinks_: AuthSocialLinks;
    private user_: UserData;

    constructor() {
        this.views = {
            header: headerView,
            subHeader: SubHeader
        };

        this.params = {
            data: {}
        };

        this.authSocialLinks_ = {
            vk: '/oauth/vk',
            fb: '/oauth/fb'
        };
    }


    public render(params: Params) {
        this.initUser_(params.requestData);

        this.setParams(params);
        return this.getParams();
    }


    protected setParams(params: Params) {
        this.setOpenGraph_(params.config, params.data);
        this.setSeo_();

        this.setHeader_(params.config);
        this.setSubHeader_(params.data);

        this.setUser_();
        this.setAuthSocialLinks_();
        this.sideMenu_(params.config);
        this.setFooter_();

        this.setConfig_(params.config, params.requestData);
    }


    protected getParams() {
        return this.params;
    }


    private setSeo_() {
        this.params.data.seo = this.seo;
    }


    private setOpenGraph_(config: AppConfig, data: Data) {
        this.params.data.openGraph = {
            fbClientId: config.facebookClientId
        };
    }


    private setHeader_(config: AppConfig) {
        this.params.data.header = this.views.header.render(
            config,
            this.entityType
        );
    }


    private setSubHeader_(data: Data) {
        const subHeader = new this.views.subHeader();

        const params = this.subHeader;
        params.user = this.user_;

        params.favoriteEntities = data.favorites ?
            favoriteView.list(data.favorites) :
            {};

        subHeader.init(params);

        this.params.data.subHeader = subHeader.getParams();
    }

    private initUser_(requestData: any) {
        this.user_ = userView.render(requestData.user);
    }


    private setUser_() {
        this.params.data.user = this.user_;
    }


    private setAuthSocialLinks_() {
        this.params.data.authSocialLinks = this.authSocialLinks_;
    }


    private sideMenu_(config: AppConfig) {
        this.params.data.sideMenu = sideMenuView.render(
            config,
            this.entityType
        );
    }


    private setFooter_() {
        this.params.data.footer = footerView.render();
    }


    private setConfig_(config: AppConfig, requestData: any) {
        this.params.config = configView.render({
            entityType: this.entityType,
            pageName: this.pageName,
            query: requestData.query,
            csrf: requestData.csrf,
            config: config
        });
    }
}

export {LayoutView};
