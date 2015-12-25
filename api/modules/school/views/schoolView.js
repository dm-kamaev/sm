const areaView = require.main.require('./api/modules/geo/views/areaView');
const metroView = require.main.require('./api/modules/geo/views/metroView');

var schoolView = {};

/**
 * @param {array<object>} schools - school instances
 * @return {array<object>}
 */
schoolView.list = function(schools) {
    return schools
        .map(school => {
            return {
                id: school.id,
                name: school.name,
                description: '',
                abbreviation: school.abbreviation,
                score: school.score || [0, 0, 0, 0],
                totalScore: getTotalScore(school.score),
                fullName: school.fullName,
                addresses: school.addresses
            };
        })
        .sort((school1, school2) => school1.totalScore - school2.totalScore);
};

/**
 * @param {object} data
 * @param {array<object>} data.schools - school instances
 * @param {array<object>} data.areas - area instances
 * @param {array<object>} data.metros - metro instances
 * @return {array<object>}
 */
schoolView.suggest = function(data) {
    return {
        schools: this.list(data.schools),
        areas: areaView.list(data.areas),
        metro: metroView.list(data.metros)
    };
};

/**
 * @param {array<object>} filters
 * @return {array<object>}
 */
schoolView.filters = function(filters) {
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
                res.config.cannotBeHidden = true;
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

/**
 *  @param {array<number>} score
 *  @return {number}
 */
var getTotalScore = function(score) {
    score = score || [];
    var count = 0, sum = 0;
    score.forEach(val => {
        if (val) {
            sum += val;
            count++;
        }
    });
    return count ? sum/count : 0;
};

module.exports = schoolView;
