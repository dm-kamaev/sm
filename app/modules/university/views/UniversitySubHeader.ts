import {SubHeader} from '../../common/lib/SubHeader';

import {entityType} from '../../common/enums/entityType';

class UniversitySubHeader extends SubHeader {
    constructor() {
        super();

        this.entityType = entityType.UNIVERSITY;

        this.logo = {
            altText: '«ВУЗы Мела»',
            linkUrl: '/',
            imgUrl: '/static/images/n-common/b-sm-subheader/university-logo.svg'
        };

        this.listLinks = {
            opener: 'Все ВУЗы',
            content: {
                items: []
            }
        };

        this.links = {
            nameL: 'Подобрать ВУЗ',
            nameM: 'Подобрать ВУЗ',
            url: '/search',
            theme: 'neptune'
        };

        this.search = {
            placeholder: 'ВУЗ, специальность',
            pageAlias: 'search',
            redirect: false
        };
    }
};

export {UniversitySubHeader};
