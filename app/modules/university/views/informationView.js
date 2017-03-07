'use strict';

const userView = require('../../../../api/modules/user/views/user'),
    footerView = require('../../../../api/modules/entity/views/footerView'),
    headerView = require('../../../../api/modules/entity/views/headerView'),
    sideMenuView = require('../../common/views/sideMenuView'),
    Subheader = require('../lib/UniversitySubheader'),
    FormatUtils = require('../../../../api/modules/entity/lib/FormatUtils');

const FULL_DESCRIPTION_LENGTH = 280;

let view = {};

/**
 * @param {{
 *     user: Object,
 *     authSocialLinks: Object,
 *     entityType: string,
 *     config: Object
 * }} data
 * @return {Object}
 */
view.render = function(data) {
    let user = userView.default(data.user);

    return {
        seo: {
            metaTitle: '',
            metaDescription: ''
        },
        openGraph: {},
        header: headerView.render(data.config, data.entityType),
        sideMenu: sideMenuView.render(data.config, data.entityType),
        subHeader: view.subheader({
            favoriteEntities: {},
            user: user
        }),
        user: user,
        authSocialLinks: data.authSocialLinks,
        entityData: data.entityData,
        subunitType: data.subunitType,
        subunitName: data.subunitName,
        modalComment: {
            header: {
                text: 'Оставьте ваш отзыв'
            },
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
                                },{
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
        },
        subscribeBoard: data.subscribeBoard,
        navigationPanel: data.navigationPanel,
        footer: footerView.render()
    };
};


/**
 * @param {Object<string, string>} data
 * @return {Object}
 */
view.subheader = function(data) {
    let subheader = new Subheader();

    subheader.init({
        isLogoRedirect: true,
        isSearchRedirect: true,
        user: data.user,
        favoriteEntities: data.favoriteEntities,
        isBottomLine: true
    });

    return subheader.getParams();
};

/**
 * @param  {string=} text
 * @return {Object}
 */
view.formatFullDescription = function(text) {
    let result = {
        cutText: []
    };

    if (text) {
        if (text.length > FULL_DESCRIPTION_LENGTH) {
            let formatUtils = new FormatUtils();
            result.fullText = [text];
            result.cutText.push(
                formatUtils.cutText(text, FULL_DESCRIPTION_LENGTH, ' ')
            );
        } else {
            result.cutText.push(text);
        }
    } else {
        result = null;
    }
    return result;
};

module.exports = view;
