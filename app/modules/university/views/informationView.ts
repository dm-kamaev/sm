/* tslint:disable:max-file-line-count */
// Made by anedashkovsky for store some params in view
// TODO: enable this rule
const FormatUtils = require('../../../../api/modules/entity/lib/FormatUtils');

const pageName = require('../../common/enums/pageName');
import {entityType} from '../../common/enums/entityType';

import {LayoutView} from '../../common/lib/Layout';
import {UniversitySubHeader} from './UniversitySubHeader';

import {lUniversity} from '../../../blocks/n-university/l-university/params';
import {UniversityFooter} from './UniversityFooter';

import {LinksFormatter} from '../../common/lib/LinksFormatter';

import {programCommentView} from '../../comment/views/programCommentView';
import {navigationPanelView} from './navigationPanelView';

import {
    BackendData,
    RenderParams
} from '../types/programInformationLayout';
import {BackendProgramComment} from '../../comment/types/programComment';
import {AppConfig} from '../../common/types/layout';

import {
    bDescriptionList
} from '../../../blocks/n-university/l-university/b-description-list/params';
import {
    bSummaryBoard
} from '../../../blocks/n-university/b-summary-board/params';
import {bSmBanner} from '../../../blocks/n-common/b-sm-banner/params';
import {
    bEntityRelation
} from '../../../blocks/n-university/b-entity-relation/params';
import {bSmSketch} from '../../../blocks/n-common/b-sm-sketch/params';
import {
    bCommentList
} from '../../../blocks/n-university/l-university/b-comment-list/params';

import {
    UniversityImageSize
} from '../../../../api/modules/university/constants/UniversityImageSize';

type Grade = {
    label: number;
    value: number;
    isSelected?: boolean;
};

type UserType = {
    label: string;
    value: string;
    isSelected?: boolean;
};

class InformationView extends LayoutView {
    private static FULL_DESCRIPTION_LENGTH = 280;

    protected params: lUniversity.Params;

    private subunitType: string;

    constructor() {
        super();

        this.views.subHeader = UniversitySubHeader;
        this.views.footer = UniversityFooter;

        this.entityType = entityType.UNIVERSITY;
        this.pageName = pageName.INFORMATION;

        this.subHeader = {
            isLogoRedirect: true,
            isSearchRedirect: true,
            isBottomLine: true
        };

        this.subunitType = 'Программа обучения';
    }

    protected setParams(params: RenderParams) {
        super.setParams(params);

        this.setEntityData_(params.data);
        this.setSubscribeBoard_(params.data);
        this.setNavigationPanel_(params.data);
        this.setComments_(params.data);
        this.setSimilarPrograms_();
        this.setUsefulCourses_();
        this.setModalComment_(params.data.program.id, params.data.userComment);
    }

    protected setSeo(data: BackendData) {
        const seoData = this.getDefaultSeoData_(data);

        this.params.data.seo = {
            metaTitle: data.pageMeta.tabTitle || seoData.title,
            metaDescription: data.pageMeta.seoDescription || seoData.description
        };
    }

    protected setOpenGraph(config: AppConfig, data: BackendData) {
        super.setOpenGraph(config, data);

        const seoData = this.getDefaultSeoData_(data),
            pageMeta = data.pageMeta;

        const description = pageMeta.openGraphDescription ||
            pageMeta.seoDescription ||
            seoData.description;

        this.params.data.openGraph.title = pageMeta.tabTitle || seoData.title;
        this.params.data.openGraph.description = description;
        this.params.data.openGraph.relapTag = this.subunitType;

        this.params.data.openGraph.image = '';
        this.params.data.openGraph.relapImage = '';
    }

    private setEntityData_(data: BackendData) {
        this.params.data.entityData = {
            id: data.program.id,
            name: data.university.name,
            subunitName: data.program.name,
            subunitType: this.subunitType,
            description: data.program.description,
            sketch: this.getSketchParams_(data),
            cutDescription: this.getCutDescription_(data.program.description),
            descriptionList: this.getDescriptionListParams_(data),
            summaryBoard: this.getSummaryBoardParams_(data),
            banner: this.getBannerParams_(data),
            entityRelation: this.getEntityRelationParams_(),
        };
    }

    private getDefaultSeoData_(data: BackendData) {
        const oksoCode = data.program.oksoCode ?
            `(${data.program.oksoCode}) ` :
            '';

        let description;
        if (data.program.description) {
            description = data.program.description;

            const formatUtils = new FormatUtils();

            while (~description.indexOf('.')) {
                description = formatUtils.cutText(
                    description,
                    description.length - 1,
                    '.'
                );
            }

        } else {
            description = `${data.program.name} в ` +
                data.university.abbreviation;
        }

        return {
            title: `${data.program.name} ${oksoCode}– ` +
                data.university.abbreviation,
            description: description
        };
    }

    private getSketchParams_(data: BackendData): bSmSketch.Params.Data {
        const universityName: string = data.university.name,
            backendImageUrl = data.university.imageUrl,
            IMAGE_WIDTH_PATTERN = /{width}/;

        const imageUrl = backendImageUrl ?
            backendImageUrl.replace(
                IMAGE_WIDTH_PATTERN, String(UniversityImageSize.DEFAULT[0])
            ) :
            null;

        return {
            description: universityName,
            image: {
                url: imageUrl,
                altText: universityName
            },
            button: {
                data: {
                    content: 'Оставить отзыв'
                },
                config: {
                    theme: 'neptune',
                    borderRoundSize: 'xl'
                }
            }
        };
    }

    private getCutDescription_(text: string) {
        let result = {
            cutText: null,
            fullText: null
        };

        if (text && text.length > InformationView.FULL_DESCRIPTION_LENGTH) {
            const formatUtils = new FormatUtils();
            const cutText = formatUtils.cutText(
                text,
                InformationView.FULL_DESCRIPTION_LENGTH,
                ' '
            );

            result.fullText = [text];
            result.cutText = [cutText];

        } else if (text) {
            result.cutText = [text];

        } else {
            result = null;
        }

        return result;
    }

    private getDescriptionListParams_(
            data: BackendData): bDescriptionList.Params.Data {
        const result: bDescriptionList.Params.Data = {
            items: []
        };

        if ((data.egeExams && data.egeExams.length > 0) ||
                (data.program.extraExam && data.program.extraExam.length > 0)) {
            const egeTests =
                data.egeExams.map(exam => `${exam.subjectName} (ЕГЭ)`);
            const entranceTests = egeTests.concat(data.program.extraExam);

            result.items.push({
                data: {
                    header: 'Вступительные испытания',
                    subitems: entranceTests
                },
                config: {
                    inline: true
                }
            });
        }


        if (data.program.links && data.program.links.length > 0) {
            const linksFormatter = new LinksFormatter();

            const links = data.program.links.map(link => ({
                url: link,
                content: linksFormatter.getContent(link)
            }));

            result.items.push({
                data: {
                    header: 'Полезные ссылки',
                    subitems: links
                },
                config: {
                    inline: false
                }
            });
        }

        if (data.program.specializations &&
                data.program.specializations.length > 0) {
            result.items.push({
                data: {
                    header: 'Специализации',
                    subitems: data.program.specializations
                },
                config: {
                    inline: false
                }
            });
        }

        return result;
    }

    private getSummaryBoardParams_(
            data: BackendData): bSummaryBoard.Params.Data {
        const neptuneTheme = 'neptune';

        let itemHeader,
            itemDescription;
        const cost = data.entranceStatistic.cost;
        if (cost) {
            itemHeader = 'Стоимость / год';
            itemDescription = `${cost} ₽`;
        }


        const item = {
            data: {
                header: itemHeader,
                description: itemDescription
            },
            config: {
                theme: neptuneTheme
            }
        };

        const buttonLink = {
            data: {
                url: '',
                content: 'Проконсультироваться'
            },
            config: {
                theme: neptuneTheme,
                size: 'xxl',
                borderRoundSize: 'm'
            }
        };

        const listItems = [],
            formatUtils = new FormatUtils(),
            egePassScore = data.entranceStatistic.egePassScore;
        let phrase;
        if (egePassScore) {
            const egeExamsAmount = data.egeExams.length;
            let description;
            if (egeExamsAmount) {
                phrase = formatUtils.declensionPrint(
                    egeExamsAmount,
                    {
                        'nom': 'экзамен',
                        'gen': 'экзамена',
                        'plu': 'экзаменов'
                    }
                );
                description = `за ${egeExamsAmount} ${phrase}`;
            } else {
                description = 'По сумме всех экзаменов';
            }

            listItems.push({
                data: {
                    header: `${data.entranceStatistic.egePassScore} баллов`,
                    description: description
                },
                config: {
                    theme: 'neptune'
                }
            });
        }

        const budgetPlaces = data.entranceStatistic.budgetPlaces;
        if (budgetPlaces >= 0 && budgetPlaces !== null) {
            phrase = formatUtils.declensionPrint(
                budgetPlaces,
                {
                    'nom': 'бюджетное место',
                    'gen': 'бюджетных места',
                    'plu': 'бюджетных мест'
                }
            );
            listItems.push({
                data: {
                    header: budgetPlaces,
                    description: phrase
                }
            });
        }

        const commercialPlaces = data.entranceStatistic.commercialPlaces;

        if (commercialPlaces >= 0 && commercialPlaces !== null) {
            phrase = formatUtils.declensionPrint(
                commercialPlaces,
                {
                    'nom': 'платное место',
                    'gen': 'платных места',
                    'plu': 'платных мест'
                }
            );
            listItems.push({
                data: {
                    header: commercialPlaces,
                    description: phrase
                }
            });
        }

        if (budgetPlaces) {
            listItems.push({
                data: {
                    header: data.entranceStatistic.competition,
                    description: 'человек на место'
                },
                config: {
                    iconType: 'people'
                }
            });
        }

        const list = [{
            header: 'Главное',
            items: listItems
        }];

        return {item, list, buttonLink};
    }

    private getBannerParams_(data: BackendData): bSmBanner.Params {
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

    private getEntityRelationParams_(): bEntityRelation.Params {
        return {
            data: {
                items: [{
                    data: {
                        content: 'ВУЗ'
                    }
                }, {
                    data: {
                        content: 'Москва'
                    }
                }]
            }
        };
    }

    private setComments_(data: BackendData) {
        this.params.data.comments = programCommentView.renderCommentsList({
            comments: data.comments,
            users: data.users
        });
    }

    private setSimilarPrograms_() {
        this.params.data.similarPrograms = {
            header: 'Похожие программы',
            data: {
                countItemsPerPage: 4,
                items: [{
                    id: 1,
                    type: entityType.UNIVERSITY,
                    name: 'Менеджер СПБГУ',
                    link: {
                        data: {
                            content: 'Специальность',
                            url: 'http://yandex.ru'
                        },
                        config: {
                            size: 'xl'
                        }
                    },
                    buttonLink: {
                        data: {
                            icon: 'arrow-circle',
                            iconType: 'svg',
                            url: 'http://yandex.ru'
                        }
                    }
                }, {
                    id: 2,
                    type: entityType.UNIVERSITY,
                    name: 'Социология НИУ-ВШЭ',
                    link: {
                        data: {
                            content: 'Специальность',
                            url: 'http://yandex.ru'
                        },
                        config: {
                            size: 'xl'
                        }
                    },
                    buttonLink: {
                        data: {
                            icon: 'arrow-circle',
                            iconType: 'svg',
                            url: 'http://yandex.ru'
                        }
                    }
                }, {
                    id: 3,
                    type: entityType.UNIVERSITY,
                    name: 'Менеджер МГУ',
                    link: {
                        data: {
                            content: 'Специальность',
                            url: 'http://yandex.ru'
                        },
                        config: {
                            size: 'xl'
                        }
                    },
                    buttonLink: {
                        data: {
                            icon: 'arrow-circle',
                            iconType: 'svg',
                            url: 'http://yandex.ru'
                        }
                    }
                }, {
                    id: 4,
                    type: entityType.UNIVERSITY,
                    name: 'Логистика НИУ-ВШЭ',
                    link: {
                        data: {
                            content: 'Специальность',
                            url: 'http://yandex.ru'
                        },
                        config: {
                            size: 'xl'
                        }
                    },
                    buttonLink: {
                        data: {
                            icon: 'arrow-circle',
                            iconType: 'svg',
                            url: 'http://yandex.ru'
                        }
                    }
                }],
                itemType: 'smInformationCard'
            }
        };
    }

    private setUsefulCourses_() {
        this.params.data.usefulCourses = {
            header: 'Полезные курсы',
            data: {
                countItemsPerPage: 3,
                items: [{
                    id: 1,
                    type: 'course',
                    name: {
                        light: 'Английский язык'
                    },
                    description: `Подготовка к ЕГЭ по английскому
                                    языку English First`,
                    imageUrl: 'http://i0.kym-cdn.com/photos/images/' +
                    'facebook/000/839/199/8a9.jpg',
                    url: 'http://yandex.ru',
                    nameLinkUrl: 'http://google.com'
                }, {
                    id: 2,
                    type: 'course',
                    name: {
                        light: 'Профориентация'
                    },
                    description: 'Система Выбор Smart Course',
                    imageUrl: 'http://lamcdn.net/lookatme.ru/' +
                    'post_image-image/vePw1jo6HLFVfp7JIU5_' +
                    'Qg-article.jpg',
                    url: 'http://yandex.ru',
                    nameLinkUrl: 'http://google.com'
                }, {
                    id: 3,
                    type: 'course',
                    name: {
                        light: 'Профориентация'
                    },
                    description: `Пропуск в профессию. Индивидуальная
                                    траектория Proekt Pro`,
                    imageUrl: 'http://cs8.pikabu.ru/post_img/2016/' +
                    '01/14/12/1452803883198482683.png',
                    url: 'http://yandex.ru',
                    nameLinkUrl: 'http://google.com'
                }],
                itemType: 'smItemCompact',
                itemConfig: {
                    theme: 'neptune-imaged',
                    enableCover: true,
                    isDescriptionLink: true,
                    nameLinkSize: 'xl',
                    nameLinkTheme: 'default'
                }
            }
        };
    }

    private setSubscribeBoard_(data: BackendData) {
        this.params.data.subscribeBoard = {
            data: {
                entityId: data.program.id,
                entityType: entityType.PROGRAM
            }
        };
    }

    private setNavigationPanel_(data: BackendData) {
        this.params.data.navigationPanel =
            navigationPanelView.getForProgram(data);
    }

    private setModalComment_(
        programId: number,
        userComment: BackendProgramComment
    ) {
        this.params.data.modalComment = programCommentView.renderModal({
            programId: programId,
            comment: userComment
        });
    }
}

export const informationView = new InformationView();
