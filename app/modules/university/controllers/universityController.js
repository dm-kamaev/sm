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
                        header: 'Бюджет',
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
                                header: '6',
                                description: 'человек на место'
                            },
                            config: {
                                iconType: 'people'
                            }
                        }]
                    }, {
                        header: 'Платное отделение',
                        items: [{
                            data: {
                                header: '200 баллов',
                                description: 'за 4 экзамена'
                            },
                            config: {
                                theme: 'neptune'
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
