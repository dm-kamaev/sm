import {SubHeader, Data} from '../../common/lib/SubHeader';

class UniversitySubHeader extends SubHeader {
    constructor(entityType: string) {
        super(entityType);

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
                openerArrowIcon: {
                    down: {
                        default: {
                            iconName: 'blue-arrow',
                            iconType: 'icon-svg',
                        }
                    }
                },
                theme: 'wide'
            }
        };

        this.search = {
            placeholder: 'Специальность, вуз…',
            pageAlias: 'search',
            redirect: false,
            sourceUrl: '/university/suggest'
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
