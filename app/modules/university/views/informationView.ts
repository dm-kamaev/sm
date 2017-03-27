/* tslint:disable:max-file-line-count */
// Made by anedashkovsky for store some params in view
// TODO: enable this rule
const FormatUtils = require('../../../../api/modules/entity/lib/FormatUtils');

const pageName = require('../../common/enums/pageName');
import {entityType} from '../../common/enums/entityType';

import {LayoutView} from '../../common/lib/Layout';
import {UniversitySubHeader} from './UniversitySubHeader';

import {AppConfig} from '../../common/types/layout';
import {lUniversity} from '../../../blocks/n-university/l-university/params';
import {BackendUser} from '../../user/types/user';
import {BackendProgram} from '../types/program';
import {BackendProgramComment} from '../../comment/types/programComment';
import {BackendUniversity} from '../types/university';
import {BackendEgeExam} from '../types/egeExam';
import {BackendEntranceStatistic} from '../types/entranceStatistic';

import {programCommentView} from '../../comment/views/programCommentView';

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


type Params = {
    data: Data;
    config: AppConfig;
    requestData: {
        user: BackendUser;
        csrf: string;
        query: any;
    }
};

type Data = {
    program: BackendProgram,
    university: BackendUniversity,
    entranceStatistic: BackendEntranceStatistic,
    comments: Array<BackendProgramComment>,
    egeExams: Array<BackendEgeExam>,
    userComment: BackendProgramComment,
    users: Array<BackendUser>,
    favorites: Array<{string: any}>
};

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

    constructor() {
        super();

        this.views.subHeader = UniversitySubHeader;

        this.entityType = entityType.UNIVERSITY;
        this.pageName = pageName.INFORMATION;

        this.seo = {
            metaTitle: 'Специальность',
            metaDescription: ''
        };

        this.subHeader = {
            isLogoRedirect: true,
            isSearchRedirect: true,
            isBottomLine: true
        };

        this.openGraph = {};
    }

    protected setParams(params: Params) {
        super.setParams(params);

        this.setEntityData_(params.data);
        this.setSubscribeBoard_(params.data);
        this.setNavigationPanel_(params.data);
        this.setModalComment_(params.data.program.id, params.data.userComment);
    }


    private setEntityData_(data: Data) {
        this.params.data.entityData = {
            id: data.program.id,
            name: data.university.name,
            subunitName: data.program.name,
            subunitType: 'Специальность',
            description: data.program.description,
            sketch: this.getSketchParams_(data),
            cutDescription: this.getCutDescription_(data.program.description),
            descriptionList: this.getDescriptionListParams_(data),
            summaryBoard: this.getSummaryBoardParams_(data),
            banner: this.getBannerParams_(data),
            entityRelation: this.getEntityRelationParams_(),
            similarPrograms: this.getSimilarProgramsParams_(),
            usefulCourses: this.getUsefulCoursesParams_(),
            comments: this.getComments_(data)
        };
    }

    private getSketchParams_(data: Data): bSmSketch.Params.Data {
        const universityName: string = data.university.name;
        return {
            description: universityName,
            image: {
                url: data.university.imageUrl,
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
            data: Data): bDescriptionList.Params.Data {
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
            const links = data.program.links.map(link => ({
                url: link,
                content: link
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

    private getSummaryBoardParams_(data: Data): bSummaryBoard.Params.Data {
        const neptuneTheme = 'neptune';
        const item = {
            data: {
                header: 'Стоимость / год',
                description: `${data.program.salary} ₽`,
                buttonLink: {
                    data: {
                        url: '',
                        content: 'Проконсультироваться'
                    },
                    config: {
                        theme: neptuneTheme,
                        size: 'xxl'
                    }
                }
            },
            config: {
                theme: neptuneTheme
            }
        };

        const listItems = [],
            formatUtils = new FormatUtils();
        let phrase = formatUtils.declensionPrint(
            data.egeExams.length,
            {
                'nom': 'экзамен',
                'gen': 'экзамена',
                'plu': 'экзаменов'
            }
        );
        listItems.push({
            data: {
                header: `${data.entranceStatistic.egePassScore} баллов`,
                description: `за ${data.egeExams.length} ${phrase}`
            },
            config: {
                theme: 'neptune'
            }
        });

        phrase = formatUtils.declensionPrint(
            data.entranceStatistic.budgetPlaces,
            {
                'nom': 'бюджетное место',
                'gen': 'бюджетных места',
                'plu': 'бюджетных мест'
            }
        );
        listItems.push({
            data: {
                header: data.entranceStatistic.budgetPlaces,
                description: phrase
            }
        });


        phrase = formatUtils.declensionPrint(
            data.entranceStatistic.budgetPlaces,
            {
                'nom': 'платное место',
                'gen': 'платных места',
                'plu': 'платных мест'
            }
        );
        listItems.push({
            data: {
                header: data.entranceStatistic.commercialPlaces,
                description: phrase
            }
        });

        listItems.push({
            data: {
                header: data.entranceStatistic.competition,
                description: 'человек на место'
            },
            config: {
                iconType: 'people'
            }
        });

        const list = [{
            header: 'Главное',
            items: listItems
        }];

        return {item, list};
    }

    private getBannerParams_(data: Data): bSmBanner.Params {
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

    private getSimilarProgramsParams_() {
        return {
            header: 'Похожие программы',
                countItemsPerPage: 4,
                items: [{
                id: 1,
                type: 'university',
                name: {
                    light: 'Менеджер СПБГУ'
                },
                description: ' ',
                additionalLink: {
                    content: 'Специальность',
                    url: 'http://yandex.ru',
                    theme: 'neptune',
                    size: 'xl'
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
                type: 'university',
                name: {
                    light: 'Социология НИУ-ВШЭ'
                },
                description: ' ',
                additionalLink: {
                    content: 'Специальность',
                    url: 'http://yandex.ru',
                    theme: 'neptune',
                    size: 'xl'
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
                type: 'university',
                name: {
                    light: 'Менеджер МГУ'
                },
                description: ' ',
                additionalLink: {
                    content: 'Специальность',
                    url: 'http://yandex.ru',
                    theme: 'neptune',
                    size: 'xl'
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
                type: 'university',
                name: {
                    light: 'Логистика НИУ-ВШЭ'
                },
                description: ' ',
                additionalLink: {
                    content: 'Специальность',
                    url: 'http://yandex.ru',
                    theme: 'neptune',
                    size: 'xl'
                },
                buttonLink: {
                    data: {
                        icon: 'arrow-circle',
                        iconType: 'svg',
                        url: 'http://yandex.ru'
                    }
                }
            }],
                itemType: 'smItemCompact',
                itemConfig: {
                theme: 'neptune'
            },
            theme: 'neptune'
        };
    }

    private getUsefulCoursesParams_() {
        return {
            header: 'Полезные курсы',
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
                    nameLinkSize: 'xl'
            },
            theme: 'neptune'
        };
    }

    private getComments_(data: Data): bCommentList.Params.Data {
        return programCommentView.renderCommentsList({
            comments: data.comments,
            users: data.users
        });
    }

    private setSubscribeBoard_(data: Data) {
        this.params.data.subscribeBoard = {
            data: {
                entityId: data.university.id,
                entityType: entityType.UNIVERSITY
            }
        };
    }

    private setNavigationPanel_(data: Data) {
        this.params.data.navigationPanel = {
            items: [{
                data: {
                    url: 'http://yandex.ru',
                    content: 'ВУЗы'
                },
                config: {
                    theme: 'sky',
                    size: 'xl'
                }
            }, {
                data: {
                    url: 'http://yandex.ru',
                    content: 'НИУ-ВШЭ'
                },
                config: {
                    theme: 'sky',
                    size: 'xl'
                }
            }, {
                data: {
                    url: 'http://yandex.ru',
                    content: 'Менеджмент'
                },
                config: {
                    theme: 'sky',
                    size: 'xl',
                    isSelected: true
                }
            }]
        };
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
