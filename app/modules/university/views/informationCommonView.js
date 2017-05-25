"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FormatUtils = require('../../../../api/modules/entity/lib/FormatUtils');
const utils_1 = require("../../common/lib/utils");
const UniversityImageSize_1 = require("../constants/UniversityImageSize");
class InformationCommonView {
    getCutDescription(text, cutTextLength) {
        const cutLength = cutTextLength ||
            InformationCommonView.CUT_DESCRIPTION_LENGTH;
        let result = {
            cutText: null,
            fullText: null
        };
        if (text && text.length > cutLength) {
            const formatUtils = new FormatUtils();
            const cutText = formatUtils.cutText(text, cutLength, ' ');
            result.fullText = [text];
            result.cutText = [cutText];
        }
        else if (text) {
            result.cutText = [text];
        }
        else {
            result = null;
        }
        return result;
    }
    getEntityRelationParams(cityName) {
        return {
            data: {
                items: [{
                        data: {
                            content: 'ВУЗ'
                        }
                    }, {
                        data: {
                            content: cityName
                        }
                    }]
            }
        };
    }
    getBannerParams() {
        return {
            data: {
                header: 'Сомневаешься?',
                description: 'Поможем с выбором и поступлением',
                buttonLink: {
                    data: {
                        url: '',
                        content: 'Подробнее'
                    },
                    config: {
                        theme: 'neptune-reverse',
                        size: 'xxl'
                    }
                }
            },
            config: {
                theme: 'neptune-compact'
            }
        };
    }
    getSketchParams(data) {
        const imageUrlDefault = utils_1.utils.getImageUrl(data.imageUrl, UniversityImageSize_1.UniversityImageSize.MEDIUM);
        const imageUrlSizeL = utils_1.utils.getImageUrl(data.imageUrl, UniversityImageSize_1.UniversityImageSize.DEFAULT);
        const params = {
            description: data.description,
            picture: {
                altText: data.imageAltText || data.description || '',
                sources: [{
                        url: imageUrlDefault,
                        size: 'default'
                    }, {
                        url: imageUrlSizeL,
                        size: 'l'
                    }]
            }
        };
        if (data.buttonText) {
            params.button = {
                data: {
                    content: data.buttonText
                },
                config: {
                    theme: 'neptune',
                    borderRoundSize: 'xl'
                }
            };
        }
        return params;
    }
}
InformationCommonView.CUT_DESCRIPTION_LENGTH = 280;
exports.informationCommonView = new InformationCommonView();
