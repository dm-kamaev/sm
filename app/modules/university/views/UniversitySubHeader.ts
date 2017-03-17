import {SubHeader, Data} from '../../common/lib/SubHeader';

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

        this.link = {
            nameL: 'Подобрать ВУЗ',
            nameM: 'Подобрать ВУЗ',
            url: '/search',
            theme: 'neptune'
        };

        this.rowLinks = {
            linkConfig: {
                theme: 'neptune',
                size: 'xxl'
            },
            listConfig: {}
        };

        this.dropdownLinks = {
            data: {
                content: {
                    items: [],
                    itemConfig: {
                        theme: 'neptune',
                        size: 'xxl'
                    }
                }
            },
            config: {
                openerTheme: 'neptune',
                openerSize: 'xxl',
                iconType: 'icon-svg',
                iconName: 'blue-arrow',
            }
        }

        this.search = {
            placeholder: 'ВУЗ, специальность',
            pageAlias: 'search',
            redirect: false
        };
    }

    protected setLinks(listLinks) {
        let links = [
            {
                url: '/',
                label: 'Программы обучения',
                isSelected: true
            }, {
                url: '/',
                label: 'Профессия'
            }, {
                url: '/',
                label: 'ВУЗ'
            }
        ];

        super.setLinks(links);

        if (links) {
            this.setRowLinks(links);
        }
    }

    protected setDropdownLinks(links) {
        let link = links.find(link => link.isSelected);

        this.dropdownLinks.data.opener = link.label;

        super.setDropdownLinks(links);
    }
};

export {UniversitySubHeader};
