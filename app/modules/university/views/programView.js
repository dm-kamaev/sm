"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FormatUtils_1 = require("../../common/lib/FormatUtils");
const entityType_1 = require("../../common/enums/entityType");
const UniversityImageSize_1 = require("../constants/UniversityImageSize");
const config = require('../../../config/config.json');
const staticImgPath = '/static/images/n-common/b-sm-item/b-sm-item_entity/images/';
const IMAGE_WIDTH_TAG = '{width}';
class ProgramView {
    getUrl(universityAlias, programAlias) {
        const protocol = config.protocol;
        const host = config.universities.host;
        return `${protocol}://${host}/vuz` +
            `/${universityAlias}/specialnost/${programAlias}`;
    }
    list(items) {
        return items.map(item => this.transformItem(item));
    }
    ;
    transformItem(item) {
        const programUrl = this.getUrl(item.universityAlias, item.programAlias);
        const imageUrl = item.imageUrl ?
            item.imageUrl.replace(IMAGE_WIDTH_TAG, UniversityImageSize_1.UniversityImageSize.DEFAULT[0].toString()) :
            staticImgPath + 'placeholder_parthenon.png';
        return {
            id: item.id,
            name: { light: item.name },
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
            type: entityType_1.entityType.PROGRAM
        };
    }
    ;
    generateNicety(item) {
        const formatUtils = new FormatUtils_1.FormatUtils();
        const res = [];
        if (item.budgetPlaces || item.egeScore) {
            const isTitleSelected = Boolean(item.competition > 20);
            res.push({
                title: item.budgetPlaces ? {
                    textDefault: 'Бюджетных мест: ' + item.budgetPlaces,
                    textXs: 'Бюджетных: ' + item.budgetPlaces,
                    selected: isTitleSelected,
                    tooltip: isTitleSelected ? 'Высокий конкурс' : null
                } :
                    null,
                value: {
                    text: item.egeScore ?
                        `от ${item.egeScore} ` + formatUtils.declensionPrint(item.egeScore, {
                            nom: 'балл',
                            gen: 'баллов',
                            plu: 'баллов'
                        }) :
                        'баллы неизвестны',
                    selected: !!item.egeScore
                }
            });
        }
        if (item.commercialPlaces || item.cost) {
            const cost = Math.floor(item.cost / 1000);
            res.push({
                title: item.commercialPlaces ? {
                    textDefault: 'Платных мест: ' + item.commercialPlaces,
                    textXs: 'Платных: ' + item.commercialPlaces
                } :
                    null,
                value: {
                    text: cost ? `${cost} тыс./год` : 'стоимость неизвестна',
                    selected: !!cost
                }
            });
        }
        return res.length ? res : null;
    }
    generateDescription(item) {
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
    generateButtonLinkParams(url) {
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
exports.programView = new ProgramView();
