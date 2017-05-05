import {BackendListProgram} from '../types/program';

import {FormatUtils} from '../../common/lib/FormatUtils';

import {bSmItemUniversity} from '../../../blocks/n-university/b-sm-item/params';
import {bSmButtonLink} from '../../../blocks/n-common/b-sm-button-link/params';

import {entityType} from '../../common/enums/entityType';

const config = require('../../../config/config.json');

const staticImgPath =
    '/static/images/n-common/b-sm-item/b-sm-item_entity/images/';

class ProgramView {
    public getUrl(universityAlias: string, programAlias: string): string {
        const protocol = config.protocol;
        const host =  config.universities.host;

        return `${protocol}://${host}/vuz` +
            `/${universityAlias}/specialnost/${programAlias}`;
    }

    public list(
            items: Array<BackendListProgram>): bSmItemUniversity.Params.Data[] {
        return items.map(item => this.transformItem(item));
    };

    protected transformItem(
            item: BackendListProgram): bSmItemUniversity.Params.Data {
        const programUrl = this.getUrl(item.universityAlias, item.programAlias);
        const imageUrl = item.imageUrl ?
            item.imageUrl :
            staticImgPath + 'placeholder_parthenon.png';

        return {
            id: item.id,
            name: {light: item.name},
            url: programUrl,
            score: item.totalScore,
            picture: {
                sources: [{
                    url: imageUrl,
                    size: 'default',
                }],
                altText: item.name
            },
            company: {
                abbreviation: item.universityAbbreviation,
                city: item.cityName,
                name: item.universityName
            },
            nicety: this.generateNicety(item),
            description: this.generateDescription(item),
            buttonLink: this.generateButtonLinkParams(programUrl),
            iconLink: {
                icon: 'arrow-right',
                type: 'svg',
                link: programUrl
            },
            type: entityType.PROGRAM
        };
    };

    protected generateNicety(
            item: BackendListProgram): bSmItemUniversity.Params.Nicety[] {
        const formatUtils = new FormatUtils();
        const res = [];

        if (item.budgetPlaces) {
            res.push({
                title: {
                    textDefault: 'Бюджетных мест: ' + item.budgetPlaces,
                    textXs: 'Бюджетных: ' + item.budgetPlaces,
                    selected: (item.competition > 3)
                },
                value: `от ${item.egeScore} ` + formatUtils.declensionPrint(
                    item.egeScore,
                    {
                        nom: 'балл',
                        gen: 'баллов',
                        plu: 'баллов'
                    }
                )
            });
        }

        if (item.commercialPlaces) {
            res.push({
                title: {
                    textDefault: 'Платных мест: ' + item.commercialPlaces,
                    textXs: 'Платных: ' + item.commercialPlaces
                },
                value: 'от ' + Math.floor(item.cost / 1000) + ' тыс./год'
            });
        }

        return res.length ? res : null;
    }

    protected generateDescription(item: BackendListProgram): string[] {
        const res = [];

        if (item.exchangeProgram) {
            res.push(`– Программы обмена (${item.exchangeProgram})`);
        }

        if (item.extraExam && item.extraExam.length) {
            const exams = item.extraExam.join(', ');
            const declensionExam = item.extraExam.length == 1 ?
                'Вступительное испытание' :
                'Вступительные испытания';
            res.push(`– ${declensionExam} - ${exams}`);
        }

        return res.length ? res : null;
    }

    protected generateButtonLinkParams(url: string): bSmButtonLink.Params {
        return {
            data: {
                content: 'Подробности',
                url: url
            },
            config: {
                borderRoundSize: 'm',
                size: 'l',
                theme: 'neptune-reverse'
            }
        };
    }
}

export const programView = new ProgramView();
