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
            nameL: 'Подобрать Вуз',
            nameM: 'Подобрать Вуз',
            url: '/search'
        };

        this.rowLinks = {
            linkConfig: {
                size: 'xxl'
            },
            listConfig: {
                size: 'xl'
            }
        };

        this.dropdownLinks = {
            data: {
                content: {
                    items: [],
                    itemConfig: {
                        size: 'xxl'
                    }
                }
            },
            config: {
                openerTheme: 'block',
                openerSize: 'xxl',
                iconType: 'icon-svg',
                iconName: 'blue-arrow',
                theme: 'wide'
            }
        };

        this.search = {
            placeholder: 'Специальность, вуз…',
            pageAlias: 'search',
            redirect: false
        };
    }

    protected setLinks(listLinks) {
        const links = [
            {
                url: '/',
                label: 'Программы обучения',
                isSelected: true
            }, {
                url: '/',
                label: 'Профессия'
            }, {
                url: '/',
                label: 'Вуз'
            }
        ];

        super.setLinks(links);

        if (links) {
            this.setRowLinks(links);
        }
    }

    protected setDropdownLinks(links) {
        let opener = null;

        const listLinks = links.filter(link => {
            if (link.isSelected) {
                opener = link.label;
            } else {
                return link;
            }
        });

        this.dropdownLinks.data.opener = opener;

        super.setDropdownLinks(listLinks);
    }
};

export {UniversitySubHeader};
