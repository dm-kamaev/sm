const headerView = require('../../../../api/modules/entity/views/headerView'),
    favoriteView =
            require('../../../../api/modules/favorite/views/favoriteView');

const configView = require('../views/configView');

import {SubHeader} from './SubHeader';
import {Header} from './Header';

import {Footer} from './Footer';

import {sideMenuView} from '../views/sideMenuView';
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
    [name: string]: any,
    favorites: Array<{string: any}>
};

type AuthSocialLinks = {
    vk: string,
    fb: string
};

abstract class LayoutView {
    protected entityType: string;

    protected pageName: string;

    protected openGraph?: {
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

    protected seo?: {
        metaTitle?: string,
        metaDescription?: string
    };

    /**
     * Views that can be overridden if necessary
     */
    protected views: {
        header: any,
        subHeader: any,
        sideMenu: any,
        favorite: any,
        footer: any
    };

    protected subHeader: {
        user?: UserData,
        favoriteEntities?: Array<{string: any}>,
        listLinks?: Array<string>,
        isLogoRedirect: boolean,
        isSearchRedirect: boolean,
        isBottomLine: boolean
    };

    protected params: iLayoutStendhal.Params;

    private authSocialLinks_: AuthSocialLinks;
    private user_: UserData;

    constructor() {
        this.views = {
            header: Header,
            subHeader: SubHeader,
            sideMenu: sideMenuView,
            favorite: favoriteView,
            footer: Footer
        };

        this.params = {
            data: {}
        };

        this.authSocialLinks_ = {
            vk: '/oauth/vk',
            fb: '/oauth/fb'
        };
    }


    public render(params: Params): iLayoutStendhal.Params {
        this.initUser_(params.requestData);

        this.setParams(params);
        return this.getParams();
    }


    protected setParams(params: Params) {
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


    protected getParams(): iLayoutStendhal.Params {
        return this.params;
    }


    protected setSeo(data: Data) {
        this.params.data.seo = this.seo;
    }


    protected setOpenGraph(config: AppConfig, data: Data) {
        this.params.data.openGraph = this.openGraph || {};

        this.params.data.openGraph.fbClientId = config.facebookClientId;
    }


    private setHeader_(config: AppConfig) {
        const headerView = new this.views.header();

        this.params.data.header = headerView.render({
            entityType: this.entityType,
            user: this.user_,
            config: config
        });
    }


    private setSubHeader_(data: Data) {
        const params = this.subHeader;
        params.user = this.user_;

        params.favoriteEntities = data.favorites ?
            this.views.favorite.list(data.favorites) :
            {};

        const subHeaderView = new this.views.subHeader();
        this.params.data.subHeader = subHeaderView.render(params);
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


    private setSideMenu_(config: AppConfig) {
        this.params.data.sideMenu = this.views.sideMenu.render({
            config: config,
            user: this.user_,
            entityType: this.entityType
        });
    }


    private setFooter_() {
        const footerView = new this.views.footer();
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
