/**
 * @fileoverview View for search page
 */
import {LayoutView} from '../../common/lib/Layout';

import {entityType} from '../../common/enums/entityType';
const pageName = require('../../common/enums/pageName');

import {UniversitySubHeader} from './UniversitySubHeader';
import {UniversityFooter} from './UniversityFooter';

import {
    BackendData,
    RenderParams
} from '../types/programSearchLayout';


class UniversityRenderHomeView extends LayoutView {
    protected params: any;//lHomeUniversity.Params;

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
    }
}

export const universityRenderHomeView = new UniversityRenderHomeView();

