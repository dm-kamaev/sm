'use strict';

const async = require('asyncawait/async');
// await = require('asyncawait/await');

const soy = require('../../../components/soy'),
    services = require('../../../components/services').all;

const logger = require('../../../components/logger/logger').getLogger('app');

const configView = require('../../common/views/configView'),
    informationView = require('../views/informationView');

const pageName = require('../../common/enums/pageName'),
    entityType = require('../../../../api/modules/entity/enums/entityType.js');

const config = require('../../../config').config;

let controller = {};

controller.information = async(function(req, res, next) {
    try {
        let authSocialLinks = services.auth.getAuthSocialUrl(),
            user = req.user || {};

        const description = `Программа для тех, кто хочет стать профессионалом
            в сфере маркетинга, управления персонала,
            бизнес–планирования и проектирования, тех, кто хочет
            построить свою карьеру в управлении бизнесом. Учебный
            процесс сочетает в себе как фундаментальное изучение
            экономики и финансов, права, социологии и психологии,
            так и овладение общеменеджериальными и специальными
            дисциплинами. Получив на первых двух курсах фундаментальную
            подготовку, на третьем–четвертом курсе студенты могут
            выбрать направление для углубленной специализации.
            Длительность обучения: 4 года.`;

        let templateData = informationView.render({
            user: user,
            entityData: {
                id: 1,
                name: `Национальный исследовательский университет –
                    Высшая школа экономики (НИУ–ВШЭ)`,
                subunitType: 'Специальность',
                subunitName: 'Менеджмент',
                description: description,
                cutDescription:
                    informationView.formatFullDescription(description),
                descriptionList: {
                    items: [{
                        data: {
                            header: 'Вступительные испытания',
                            subitems: [
                                'Русский язык (ЕГЭ)',
                                'Математика (ЕГЭ)',
                                'Обществознание (ЕГЭ)',
                                'Английский язык (ЕГЭ)',
                                'Портфолио (до 12 баллов)',
                                'нормы ГТО (до 2 баллов)'
                            ]
                        },
                        config: {
                            inline: true
                        }
                    }, {
                        data: {
                            header: 'Полезные ссылки',
                            subitems: [{
                                url: 'http://www.hse.ru',
                                content: 'www.hse.ru'
                            }, {
                                url: 'http://vk.com/hse_university',
                                content: 'vk.com/hse_university'
                            }, {
                                url: 'http://facebook.com/hse.ru',
                                content: 'facebook.com/hse.ru'
                            }]
                        },
                        config: {
                            inline: false
                        }
                    }, {
                        data: {
                            header: 'Специализации',
                            subitems: [
                                'Логистика и управление цепями поставок',
                                'Международный бизнес',
                                'Управление проектами',
                                'Менеджмент фабрик'
                            ]
                        },
                        config: {
                            inline: false
                        }
                    }]
                },
                summaryBoard: {
                    list: [{
                        header: 'Главное',
                        items: [{
                            data: {
                                header: '245 баллов',
                                description: 'за 4 экзамена'
                            },
                            config: {
                                theme: 'neptune'
                            }
                        }, {
                            data: {
                                header: '30',
                                description: 'бюджетных мест'
                            }
                        }, {
                            data: {
                                header: '100',
                                description: 'платных мест'
                            }
                        }, {
                            data: {
                                header: '7',
                                description: 'человек на место'
                            },
                            config: {
                                iconType: 'people'
                            }
                        }]
                    }],
                    item: {
                        data: {
                            header: 'Стоимость / год',
                            description: '350 000 ₽',
                            buttonLink: {
                                data: {
                                    url: 'http://yandex.ru',
                                    content: 'Проконсультироваться'
                                },
                                config: {
                                    theme: 'neptune',
                                    size: 'xxl'
                                }
                            }
                        },
                        config: {
                            theme: 'neptune'
                        }
                    }
                },
                banner: {
                    data: {
                        header: 'Сомневаешься?',
                        description: 'Поможем с выбором и поступлением',
                        buttonLink: {
                            data: {
                                url: 'http://yandex.ru',
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
                },
                entityRelation: {
                    data: {
                        items: [{
                            data: {
                                content: 'ВУЗ'
                            }
                        }, {
                            data: {
                                url: 'http://yandex.ru',
                                content: 'ТОП 50'
                            },
                            config: {
                                theme: 'neptune',
                                size: 's'
                            }
                        }, {
                            data: {
                                content: 'Москва'
                            }
                        }]
                    }
                },
                similarPrograms: {
                    header: 'Похожие программы',
                    countItemsPerPage: 4,
                    items: [{
                        id: 1,
                        type: 'university',
                        name: {
                            light: 'Менеджер СПБГУ'
                        },
                        description: ' ',
                        descriptionLink: {
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
                        descriptionLink: {
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
                        descriptionLink: {
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
                        descriptionLink: {
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
                        theme: 'neptune',
                        isNameNotLink: true
                    },
                    theme: 'neptune'
                },
                usefulCourses: {
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
                            'facebook/000/839/199/8a9.jpg'
                    }, {
                        id: 2,
                        type: 'course',
                        name: {
                            light: 'Профориентация'
                        },
                        description: 'Система Выбор Smart Course',
                        imageUrl: 'http://lamcdn.net/lookatme.ru/post_image-' +
                            'image/vePw1jo6HLFVfp7JIU5_Qg-article.jpg'
                    }, {
                        id: 3,
                        type: 'course',
                        name: {
                            light: 'Профориентация'
                        },
                        description: `Пропуск в профессию. Индивидуальная
                            траектория Proekt Pro`,
                        imageUrl: 'http://cs8.pikabu.ru/post_img/2016/01/14/' +
                            '12/1452803883198482683.png'
                    }],
                    itemType: 'smItemCompact',
                    itemConfig: {
                        theme: 'neptune-imaged',
                        enableCover: true,
                        nameLinkSize: 'xl'
                    },
                    theme: 'neptune'
                }
            },
            authSocialLinks: authSocialLinks,
            entityType: entityType.UNIVERSITY,
            config: config,
            subscribeBoard: {
                data: {
                    description: `Напомним о днях открытых дверей,
                        пришлём списки зачисления и проходные баллы
                        вам на почту`,
                    input: {
                        data: {
                            placeholder: 'Введите свой email',
                            maxLength: 50,
                            name: 'Подписка на новости этого вуза:',
                            type: 'text'
                        },
                        config: {
                            theme: 'neptune',
                            validations: ['email', 'notEmpty']
                        }
                    }
                }
            }
        });

        let templateConfig = configView.render({
            entityType: entityType.UNIVERSITY,
            pageName: pageName.INFORMATION,
            query: req.query,
            csrf: req.csrfToken(),
            config: config
        });

        let html = soy.render(
            'sm.lUniversity.Template.university', {
                params: {
                    data: templateData,
                    config: templateConfig
                }
            }
        );

        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
    } catch (error) {
        logger.error(error);

        res.status(error.code || 500);
        next(error);
    }
});

module.exports = controller;
