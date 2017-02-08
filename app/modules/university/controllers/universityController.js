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

        let templateData = informationView.render({
            user: user,
            entityData: {
                id: 1,
                name: `Национальный исследовательский университет –
                    Высшая школа экономики (НИУ–ВШЭ)`,
                subunitType: 'Специальность',
                subunitName: 'Менеджемент',
                description: `Программа для тех, кто хочет стать профессионалом
                    в сфере маркетинга, управления персонала,
                    бизнес–планирования и проектирования, тех, кто хочет
                    построить свою карьеру в управлении бизнесом. Учебный
                    процесс сочетает в себе как фундаментальное изучение
                    экономики и финансов, права, социологии и психологии,
                    так и овладение общеменеджериальными и специальными
                    дисциплинами. Получив на первых двух курсах фундаментальную
                    подготовку, на третьем–четвертом курсе студенты могут
                    выбрать направление для углубленной специализации.
                    Длительность обучения: 4 года.`,
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
                            },
                            config: {
                                icon: true
                            }
                        }, {
                            data: {
                                header: '6',
                                description: 'человек на место'
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
                                icon: true
                            }
                        }]
                    }],
                    content: {
                        data: {
                            header: 'Стоимость / год',
                            description: '350 000 ₽',
                            link: {
                                url: 'http://yandex.ru',
                                content: 'Проконсультироваться'
                            }
                        },
                        config: {
                            theme: 'neptune'
                        }
                    }
                }
            },
            authSocialLinks: authSocialLinks,
            entityType: entityType.UNIVERSITY,
            config: config
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
