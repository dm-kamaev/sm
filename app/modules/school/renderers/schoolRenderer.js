var render = {};

/**
 *
 * @param filters
 * @return {Object}
 */
render.filters = function(filters) {
    return filters.map(item => {
        var res = {
            data: {
                filters: item.values,
                header: {
                    help: ''
                },
                name: item.filter
            },
            config: {}
        };

        switch (item.filter) {
            case 'school_type':
                res.data.header.title = 'Тип школы';
                res.config.filtersToShow = 15;
                break;
            case 'ege':
                res.data.header.title = 'Высокие результаты ЕГЭ';
                break;
            case 'gia':
                res.data.header.title = 'Высокие результаты ГИА';
                break;
            case 'olimp':
                res.data.header.title = 'Есть победы в олимпиадах';
                break;
        }

        return res;
    });
};


module.exports = render;
