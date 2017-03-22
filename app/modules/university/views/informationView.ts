const FormatUtils = require('../../../../api/modules/entity/lib/FormatUtils');

const pageName = require('../../common/enums/pageName');
import {entityType} from '../../common/enums/entityType';

import {LayoutView} from '../../common/lib/Layout';
import {UniversitySubHeader} from './UniversitySubHeader';

import {AppConfig} from '../../common/types/layout';
import {lUniversity} from '../../../blocks/n-university/l-university/params';
import {BackendUser} from '../../user/types/user';
import {BackendProgram} from '../types/program';
import {BackendProgramComment} from '../types/programComment';
import {BackendUniversity} from '../types/university';
import {BackendEgeExam} from '../types/egeExam';
import {BackendEntranceStatistic} from '../types/entranceStatistic';

import {
    bDescriptionList
} from '../../../blocks/n-university/l-university/b-description-list/params';
import {
    bSummaryBoard
} from '../../../blocks/n-university/b-summary-board/params';
import {bSmBanner} from '../../../blocks/n-common/b-sm-banner/params';

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
    program: BackendProgram,
    university: BackendUniversity,
    entranceStatistic: BackendEntranceStatistic,
    comments: Array<BackendProgramComment>,
    egeExams: Array<BackendEgeExam>,
    userComment: BackendProgramComment,
    users: Array<BackendUser>,
    favorites: Array<{string: any}>,
    entityData: any,
    subscribeBoard: string,
    navigationPanel: string
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
        this.setModals_(params.data.program.id);
    }


    private setEntityData_(data: Data) {
        this.params.data.entityData = {
            id: data.program.id,
            name: data.university.name,
            subunitName: data.program.name,
            subunitType: 'Специальность',
            description: data.program.description,
            cutDescription: this.getCutDescription_(data.program.description),
            descriptionList: this.getDescriptionListParams_(data),
            summaryBoard: this.getSummaryBoardParams_(data)
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

        const egeTests = data.egeExams.map(exam => exam.subjectName);
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

        result.items.push({
            data: {
                header: 'Специализации',
                subitems: data.program.specializations
            },
            config: {
                inline: false
            }
        });

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

        const listItems = [];
        listItems.push({
            data: {
                header: `${data.entranceStatistic.egePassScore} баллов`,
                description: `за ${data.egeExams.length} экзамена`
            },
            config: {
                theme: 'neptune'
            }
        });
        listItems.push({
            data: {
                header: data.entranceStatistic.budgetPlaces,
                description: 'бюджетных мест'
            }
        });
        listItems.push({
            data: {
                header: data.entranceStatistic.commercialPlaces,
                description: 'платных мест'
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

    private setSubscribeBoard_(data: Data) {
        this.params.data.subscribeBoard = data.subscribeBoard;
    }

    private setNavigationPanel_(data: Data) {
        this.params.data.navigationPanel = data.navigationPanel;
    }

    private setModals_(programId: number) {
        this.params.data.modalComment = {
            header: {
                text: 'Оставьте ваш отзыв'
            },
            api: `/program/${programId}/comment`,
            content: {
                userFields: {
                    userType: {
                        data: {
                            name: 'userType',
                            defaultOpenerText: 'Кто вы?',
                            content: {
                                items: [{
                                    label: 'Выпускник',
                                    value: 'Graduate'
                                },
                                {
                                    label: 'Студент',
                                    value: 'Student'
                                }]
                            },
                            contentConfig: {
                                size: 'm'
                            }
                        },
                        config: {
                            iconName: 'blue-arrow',
                            iconType: 'icon-svg',
                            theme: 'light'
                        },
                        controlName: 'dropdown-select'
                    },
                    yearGraduate: {
                        data: {
                            name: 'yearGraduate',
                            placeholder: 'Укажите год выпуска'
                        },
                        config: {
                            theme: 'thin',
                            validations: ['notEmpty']
                        },
                        controlName: 'input'
                    },
                    grade: {
                        data: {
                            name: 'grade',
                            defaultOpenerText: 'Укажите курс',
                            content: {
                                items: [{
                                    label: 1,
                                    value: 1
                                },
                                {
                                    label: 2,
                                    value: 2
                                },
                                {
                                    label: 3,
                                    value: 3
                                },
                                {
                                    label: 4,
                                    value: 4
                                },
                                {
                                    label: 5,
                                    value: 5
                                },
                                {
                                    label: 6,
                                    value: 6
                                }]
                            },
                            contentConfig: {
                                size: 'm'
                            }
                        },
                        config: {
                            iconName: 'blue-arrow',
                            iconType: 'icon-svg',
                            theme: 'light'
                        },
                        controlName: 'dropdown-select'
                    }
                },
                fields: [{
                    data: {
                        title: 'Что понравилось',
                        name: 'pros',
                        placeholder: 'Ваш комментарий',
                        maxLength: 500
                    },
                    config: {
                        showCounter: true,
                        autoHeight: true,
                        theme: 'thin',
                        minHeight: 'large'
                    },
                    controlName: 'textarea'
                }, {
                    data: {
                        title: 'Не понравилось',
                        name: 'cons',
                        placeholder: 'Ваш комментарий',
                        maxLength: 500
                    },
                    config: {
                        showCounter: true,
                        autoHeight: true,
                        theme: 'thin',
                        minHeight: 'large'
                    },
                    controlName: 'textarea'
                }, {
                    data: {
                        title: 'Какой совет можешь дать поступающим?',
                        name: 'advice',
                        placeholder: 'Ваш комментарий',
                        maxLength: 500
                    },
                    config: {
                        showCounter: true,
                        autoHeight: true,
                        theme: 'thin',
                        minHeight: 'large'
                    },
                    controlName: 'textarea'
                }],
                evaluations: {
                    title: 'Ваши оценки',
                    items: [{
                        name: 'Образование',
                        description: `Достигают ли ученики высоких
                            результатов на государственных экзаменах,
                            олимпиадах и вступительных испытаниях в ВУЗах?`
                    }, {
                        name: 'Преподаватели',
                        description: `Являются ли учителя квалифицированными
                            специалистами, которые любят свою работу, хорошо
                            общаются с детьми и помогают им получать
                            отличные знания?`
                    }, {
                        name: 'Атмосфера',
                        description: `Созданы ли в школе комфортная для
                            получения знаний атмосфера и доверительные
                            отношения между учениками, учителями,
                            родителями и администрацией?`
                    }, {
                        name: 'Инфраструктура',
                        description: `Хорошо ли оборудована школа, есть ли
                            в ней всё для комфортного обучения и
                            всестороннего развития детей?`
                    }]
                },
            },
            contentName: 'smInteractionFormComment',
            button: {
                data: {
                    content: 'Оставить отзыв'
                },
                config: {
                    theme: 'neptune-reverse',
                    borderRoundSize: 'xl',
                    size: 'xl'
                }
            },
            closer: {
                iconName: 'blue-close',
                iconType: 'icon-svg'
            }
        };
    }
}

export const informationView = new InformationView();
