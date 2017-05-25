"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Footer_1 = require("../../common/lib/Footer");
class UniversityFooter extends Footer_1.Footer {
    constructor() {
        super();
        this.config = {
            theme: 'overcast'
        };
        this.columnList = {
            items: [{
                    label: 'Найти вуз',
                    type: 'smHeadedList',
                    links: [{
                            content: 'Программы обучения',
                            url: '/program/search'
                        } /*, {
                            content: 'ВУЗы',
                            url: 'http://mel.fm/'
                        }, {
                            content: 'ВУЗы по регионам',
                            url: 'http://mel.fm/'
                        }*/
                    ],
                    linksConfig: {
                        theme: 'overcast',
                        size: 'xxl',
                        disableHover: true
                    }
                },
                {
                    label: 'Информация',
                    type: 'smHeadedList',
                    links: [
                        {
                            content: 'Сотрудничество ',
                            url: 'mailto:vs@mel.fm'
                        }, {
                            content: 'Пользовательское соглашение',
                            url: 'http://mel.fm/page/terms-of-use'
                        }
                    ],
                    linksConfig: {
                        theme: 'overcast',
                        size: 'xxl',
                        disableHover: true
                    }
                }],
            theme: 'overcast'
        };
        this.logotypes = [{
                type: 'mel-logo_white',
                url: 'http://mel.fm'
            }, {
                type: 'school-logo_white',
                url: 'http://schools.mel.fm'
            }, {
                type: 'course-logo_white',
                url: 'http://courses.mel.fm'
            }];
    }
}
exports.UniversityFooter = UniversityFooter;
;
