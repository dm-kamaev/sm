'use strict';

const async = require('asyncawait/async');
// await = require('asyncawait/await');

const soy = require('../../../components/soy'),
    services = require('../../../components/services').all;

const logger = require('../../../components/logger/logger').getLogger('app');

const configView = require('../../common/views/configView'),
    informationView = require('../views/informationViewLegacy');

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

        const comment = {
            author: {
                photoUrl: 'http://avatar.exe.by/avatars/movie/' +
                    'img/0973.jpg',
                name: 'Егор',
                status: 'Выпускник 2016'
            },
            score: 3,
            text: [{
                header: 'Что понравилось',
                description: `Вариативность в направленности
                обучения. Грубо говоря, если ты хочешь грызть
                гранит науки - вот тебе одна дорога, если хочешь
                нарабатывать опыт и стажироваться - вот тебе другая.
                Такая возможность есть, действительно, но для этого
                нужно быть коммуникабельным. Этот ВУЗ как никакой
                другой подразумевает то, что ты сам должен искать
                выходы и нестандартные решения. Они есть, но найти
                их должен ты сам. И это будет не самая легкая
                задачка)`
            }, {
                header: 'Не понравилось',
                description: `Коммерция в ВУЗе. Кажется, будто этот
                ВУЗ заточен под то, чтобы ты платил. При входе
                расположен Синергия Store, где ты можешь приобрести
                всю атрибутику. Преподаватели не берут взяток, это
                ложь. Но выпускники заочного и электронного
                обучения, как правило, ничего не знают о своей
                профессии. То есть, сам ВУЗ не проверяет знания.
                Если ты не хочешь учиться - ты получишь корочку,
                это да. Но знания нужно добывать. Они не польются к
                тебе ручьем. Но это, наверное, в любом ВУЗе.
                Внутренней жизни ВУЗа (старосты, студ. актив,
                посвяты) практически нет. Если что-то есть - то это
                вечеринки. Но на них ты не чувствуешь себя
                причастным. Собственно это один из главных минусов
                - ты просто ходишь в ВУЗ как на серую работу. Нет
                причастности. Нет ощущения сообщества. Ну и
                напоследок - почти никто из работодателей ничего
                не знает о Синергии. Хотя, полагаю, что с учетом
                "Synergy Global Forum" всё изменится.`
            }, {
                header: 'Какой совет можешь дать поступающим?',
                description: `Если вы уверены в том, что готовы
                рыть носом землю и искать выходы на что-то
                большое и прибыльное - то этот ВУЗ для вас.
                Собственно говоря, если вы набрали минимум
                баллов по ЕГЭ и не проходите на бюджет, то у
                вас есть только платное отделение. Синергия -
                это как РАНХ, как ВШЭ, только бюджетней. И здесь
                вы будете не учиться с "делягами", а находиться в
                том месте, где эти "деляги" работают. Смотрите в
                верхний эшелон) И пробуйте)`
            }]
        };

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
                        imageUrl: 'http://lamcdn.net/lookatme.ru/post_image-' +
                            'image/vePw1jo6HLFVfp7JIU5_Qg-article.jpg',
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
                        imageUrl: 'http://cs8.pikabu.ru/post_img/2016/01/14/' +
                            '12/1452803883198482683.png',
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
                },
                comments: {
                    header: 'Отзывы – Менеджмент (НИУ–ВШЭ)',
                    list: {
                        items: [comment, comment, comment, comment, comment],
                        itemType: 'smComment'
                    }
                }
            },
            authSocialLinks: authSocialLinks,
            entityType: entityType.UNIVERSITY,
            config: config,
            navigationPanel: {
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
            },
            subscribeBoard: {
                data: {
                    entityId: 1,
                    entityType: entityType.UNIVERSITY
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
