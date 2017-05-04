import {Footer} from '../../common/lib/Footer';

class UniversityFooter extends Footer {
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
                    url: 'http://mel.fm/'
                }/*, {
                    content: 'ВУЗы',
                    url: 'http://mel.fm/'
                }, {
                    content: 'ВУЗы по регионам',
                    url: 'http://mel.fm/'
                }*/],
                linksConfig: {
                    theme: 'overcast',
                    size: 'xxl',
                    disableHover: true
                }
            }, /*{
                type: 'smItemList',
                links: [{
                    content: 'ВУЗы по профилям',
                    url: 'http://mel.fm/'
                }, {
                    content: 'Профессии',
                    url: 'http://mel.fm/'
                }, {
                    content: 'Специальности',
                    url: 'http://mel.fm/'
                }],
                linksConfig: {
                    theme: 'overcast',
                    size: 'xxl',
                    disableHover: true
                }
            },*/ {
                label: 'Информация',
                type: 'smHeadedList',
                links: [/*{
                    content: 'Статьи',
                    url: 'http://mel.fm/'
                }, */{
                    content: 'Сотрудничество ',
                    url: 'mailto:vs@mel.fm'
                }, {
                    content: 'Пользовательское соглашение',
                    url: 'http://mel.fm/page/terms-of-use'
                }],
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
};

export {UniversityFooter};
