/**
 * @param {{
 *     user: Object,
 *     authSocialLinks: Object,
 *     countResults: number,
 *     coursesList: Array<Object>,
 *     searchParams: Object
 * }} data
 * @return {Object}
 */
exports.render = function(data) {
    return {
        seo: {
            metaTitle: 'Кружки и секции'
        },
        subHeader: {
            logo: {
                imgUrl: '/images/n-common/b-sm-subheader/course-logo.svg'
            },
            links: {
                nameL: 'Все курсы, кружки и секции',
                nameM: 'Все курсы',
                url: '/'
            },
            search: {},
            user: data.user,
            favorites: []
        },
        user: data.user,
        authSocialLinks: data.authSocialLinks,
        map: {
            schools: []
        },
        search: {
            countResults: data.countResults,
            searchText: '',
            declensionEntityType: {
                nom: 'курс',
                gen: 'курса',
                plu: 'курсов'
            }
        },
        sort: {
            listItems: [{
                'label': 'Средняя оценка',
                'text': 'средней оценке'
            }, {
                'label': 'Образование',
                'text': 'образованию'
            }, {
                'label': 'Преподаватели',
                'text': 'преподавателям'
            }, {
                'label': 'Атмосфера',
                'text': 'атмосфере'
            }, {
                'label': 'Инфраструктура',
                'text': 'инфраструктуре'
            }],
            staticText: 'Сортировать по ',
            defaultOpenerText: 'средней оценке'
        },
        entityList: {
            items: data.coursesList,
            itemType: 'smItemEntity'
        },
        searchSettings: {
            url: 'api/course/search',
            method: 'GET',
            searchParams: data.searchParams
        }
    };
};
