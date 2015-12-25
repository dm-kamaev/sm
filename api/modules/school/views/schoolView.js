
var services = require.main.require('./app/components/services').all;

const areaView = require.main.require('./api/modules/geo/views/areaView.js');
const metroView = require.main.require('./api/modules/geo/views/metroView.js');

var schoolView = {};

/**
 * @param {array<object>} schools - school instances
 * @return {array<object>}
 */
schoolView.default = function(schoolInstance) {

    var addresses =
            services.department.addressesFilter(schoolInstance.addresses),
        comments = schoolInstance.commentGroup ?
            schoolInstance.commentGroup.comments : [],
        score = schoolInstance.score || [0, 0, 0, 0];

    return {
        id: schoolInstance.id,
        schoolName: schoolInstance.name,
        schoolType: schoolInstance.schoolType,
        schoolDescr: '',
        features: [],
        directorName: schoolInstance.director,
        schoolQuote : 'Мел',
        extendedDayCost: '',
        dressCode: '',
        classes: getEducationInterval(schoolInstance.educationInterval),
        social: [],
        metroStations: services.address.getMetro(addresses),
        sites: getSites(schoolInstance.site),
        activities: [],
        specializedClasses: [],
        contacts: getContacts(addresses,schoolInstance.phones),
        comments: getComments(comments),
        coords: services.address.getCoords(addresses),
        ratings: getRatings(schoolInstance.rating, schoolInstance.rank),
        score: score,
        totalScore: getTotalScore(score)
    };
};

/**
 *  @param {array<number>} interval
 *  @return {string}
 */
var getEducationInterval = function(interval) {
    var res = '';

    if (interval) {
        var begin = interval[0],
            end = interval[interval.length - 1];

        res += begin ? begin : 'Детский сад';

        if (end > begin) {
            res += '–';
            res += end;
            res += begin ? ' классы' : ' класс';
        }
    }

    return res;
};

/**
 *  @param {string} site
 *  @return {array<object>}
 */
var getSites = function(site) {
    return [{
        name: 'Перейти на сайт школы',
        href: 'http://' + site,
        link: site
    }];
};

/**
 *  @param {array<object>} addresses
 *  @param {array<string>} phones
 *  @return {object}
 */
var getContacts = function(addresses, phones) {
    return {
        address: getAddress(addresses),
        phones: phones || ''
    };
};

/**
 *  @param {array<object>} addresses
 *  @return {array<object>}
 */
var getAddress = function(addresses) {
    return addresses.map(address => {
        return {
            title: '',
            description: address.name,
            metro: services.address.getMetro(address)
        };
    });
};

/**
 *  @param {array<object>} comments
 *  @return {array<object>}
 */
var getComments = function(comments) {
    var typeConvert = {
        'Parent': 'родитель',
        'Graduate': 'выпускник',
        'Scholar': 'ученик'
    };

    return comments
        .filter(comment => comment.text)
        .map(comment => {
            return {
                author: '',
                rank: typeConvert[comment.userType],
                text: comment.text,
                sections: getSections(comment.rating)
            };
        });
};

/**
 *  @param {array<object>} rating
 *  @return {array<object>}
 */
var getSections = function(rating) {
    return rating ? rating.score.map((score, index) => {
        var type = [
            'Образование',
            'Преподаватели',
            'Инфраструктура',
            'Атмосфера'
        ];
        return {
            name: type[index],
            rating: score
        };
    }) : [];
};

/**
 *  @param {number} rating
 *  @param {number} rank
 *  @return {array<object>}
 */
var getRatings = function(rating, rank) {
    var ratings = [];
    /*Check that position in Mel's rating exists and less than 100*/
    if (rating && rating <= 100) {
        ratings.push({
            name: 'Рейтинг пользователей «Мела»',
            place: rating,
            href: '/search'
        });
    }

    /*Check that position in Moscow education dept.
      rating exists and less than 100*/
    if (rank && rank <= 100) {
        ratings.push({
            name: 'Рейтинг Департамента образования Москвы',
            place: rank
        });
    }

    return ratings;
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
        .sort((school1, school2) => school2.totalScore - school1.totalScore);
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
    }
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

module.exports = schoolView;
