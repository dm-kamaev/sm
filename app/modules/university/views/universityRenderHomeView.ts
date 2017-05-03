/**
 * @fileoverview View for search page
 */
import {LayoutView} from '../../common/lib/Layout';

import {entityType} from '../../common/enums/entityType';
const pageName = require('../../common/enums/pageName');

import {UniversitySubHeader} from './UniversitySubHeader';
import {UniversityFooter} from './UniversityFooter';

import {
    RenderParams,
    BackendData
} from '../types/universityHomeLayout';

import {
    lHomeUniversity
} from '../../../blocks/n-university/l-home-university/params';


class UniversityRenderHomeView extends LayoutView {
    protected params: lHomeUniversity.Params;

    constructor() {
        super(entityType.UNIVERSITY);

        this.views.subHeader = UniversitySubHeader;
        this.views.footer = UniversityFooter;

        this.pageName = pageName.HOME;

        this.seo = {
            metaTitle: 'Поиск программ, факультетов и специальностей на Меле',
            metaDescription: 'Узнай, в какой вуз России ты можешь поступить ' +
                'с твоими баллами ЕГЭ. Выбери вуз, который подходит тебе, ' +
                'и подпишись на новости о днях открытых дверей и публикации ' +
                'списков зачисления!'
        };

        this.subHeader = {
            isLogoRedirect: false,
            isSearchRedirect: true,
            isBottomLine: true
        };
    }

    protected setParams(params: RenderParams) {
        super.setParams(params);

        this.setSearchPanel_(params.data);
        this.setPopularUniversities_();
        this.setArticles_();
    }

    private setSearchPanel_(data: BackendData) {
        this.params.data.searchPanel = {};
    }

    private setPopularUniversities_() {
        this.params.data.populars = {};
    }

    private setArticles_() {
        this.params.data.articles = {};
    }
}

export const universityRenderHomeView = new UniversityRenderHomeView();

