const SubHeader = require('../../../../api/modules/entity/lib/Subheader');

const userView = require('../../../../api/modules/user/views/user'),
    headerView = require('../../../../api/modules/entity/views/headerView'),
    footerView = require('../../../../api/modules/entity/views/footerView'),
    favoriteView =
            require('../../../../api/modules/favorite/views/favoriteView');

const sideMenuView = require('../views/sideMenuView'),
    configView = require('../views/configView');

import {
    iLayoutStendhal
} from '../../../blocks/n-clobl/i-layout/params';

type Params = {
    data: Data,
    config: AppConfig,
    request: any
};

type Data = {
    favorites: Array<{string: any}>
};

type AppConfig = {
    schools: {
        analyticsId: string,
        yandexMetrikaId: number,
        host: string
    },
    courses: {
        analyticsId: string,
        yandexMetrikaId: number,
        host: string,
        experimentId?: string
    },
    universities: {},
    facebookClientId: number
};

type User = {
    lastName: (string|undefined),
    firstName: (string|undefined)
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
    metaTitle: string,
    metaDescription?: string
};

type SubHeader = {
    user?: User,
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

export abstract class LayoutView {
    protected views: {
        header: any,
        subHeader: any
    };

    protected entityType: string;
    protected pageName: string;

    protected openGraph?: OpenGraph;
    protected seo: Seo;
    protected subHeader: SubHeader;

    protected params: iLayoutStendhal.Params;

    private authSocialLinks_: AuthSocialLinks;
    private user_: User;

    constructor() {
        this.views = {
            header: headerView,
            subHeader: SubHeader
        };

        this.authSocialLinks_ = {
            vk: '/oauth/vk',
            fb: '/oauth/fb'
        };
    }


    public render(params: Params) {
        this.initUser_(params.request);

        this.setParams(params);
        return this.getParams();
    }


    protected setParams(params: Params) {
        this.setOpenGraph_(params.config, params.data);
        this.setHeader_(params.config);
        this.setSubHeader_(params.data);

        this.setUser_();
        this.setAuthSocialLinks_();
        this.sideMenu_(params.config);
        this.setFooter_();
        this.setConfig_(params.config, params.request);
    }


    protected getParams() {
        return this.params;
    }


    private setOpenGraph_(config: AppConfig, data: Data) {
        this.params.data.openGraph = {
            fbClientId: config.facebookClientId
        };
    }


    private setHeader_(config: AppConfig) {
        this.params.data.header = this.views.header.render({
            entityType: this.entityType,
            config: config
        });
    }


    private setSubHeader_(data: Data) {
        const subHeader = new this.views.subHeader();

        const params = this.subHeader;
        params.user = this.user_;
        params.favoriteEntities = favoriteView.list(data.favorites);

        subHeader.init(params);

        this.params.data.subHeader = subHeader.getParams();
    }

    private initUser_(request: any) {
        const user = request.user || {};
        this.user_ = userView.default(user);
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
        footerView.render();
    }


    private setConfig_(config: AppConfig, request: any) {
        this.params.config = configView.render({
            entityType: this.entityType,
            pageName: this.pageName,
            query: request.query,
            csrf: request.csrfToken(),
            config: config
        });
    }
}
