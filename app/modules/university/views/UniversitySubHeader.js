"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SubHeader_1 = require("../../common/lib/SubHeader");
class UniversitySubHeader extends SubHeader_1.SubHeader {
    constructor(entityType) {
        super(entityType);
        this.logo = {
            altText: '«ВУЗы Мела»',
            linkUrl: '/',
            imgUrl: '/static/images/n-common/b-sm-subheader/university-logo.svg'
        };
        this.link = {
            nameL: 'Все программы обучения',
            nameM: 'Все программы обучения',
            url: '/program/search'
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
            placeholder: 'Название программы',
            pageAlias: 'search',
            redirect: false,
            sourceUrl: '/university/suggest',
            disableSearchBehavior: true
        };
    }
    setLinks(listLinks) {
        // const links = [
        //     {
        //         url: '/',
        //         label: 'Программы обучения',
        //         isSelected: true
        //     }, {
        //         url: '/',
        //         label: 'Профессия'
        //     }, {
        //         url: '/',
        //         label: 'Вуз'
        //     }
        // ];
        super.setLinks(listLinks);
        if (listLinks) {
            this.setRowLinks(listLinks);
        }
    }
    setDropdownLinks(links) {
        // let opener = null;
        // const listLinks = links.filter(link => {
        //     if (link.isSelected) {
        //         opener = link.label;
        //     } else {
        //         return link;
        //     }
        // });
        // this.dropdownLinks.data.opener = opener;
        // super.setDropdownLinks(listLinks);
        super.setDropdownLinks(links);
    }
}
exports.UniversitySubHeader = UniversitySubHeader;
;
