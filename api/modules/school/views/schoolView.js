
var services = require.main.require('./app/components/services').all;

const areaView = require.main.require('./api/modules/geo/views/areaView.js');
const metroView = require.main.require('./api/modules/geo/views/metroView.js');
const addressView = require.main.require(
    './api/modules/geo/views/addressView.js');
const activityView = require.main.require(
    './api/modules/school/views/activityView.js');

var schoolView = {};

/**
 * @param {array<object>} schoolInstance - school instances
 * @return {object}
 */
schoolView.default = function(schoolInstance) {

    var addresses =
            services.department.addressesFilter(schoolInstance.addresses),
        comments = schoolInstance.commentGroup ?
            schoolInstance.commentGroup.comments : [],
        score = schoolInstance.score || [0, 0, 0, 0],
        scoreCount = schoolInstance.scoreCount || [0, 0, 0, 0];

    return {
        id: schoolInstance.id,
        schoolName: schoolInstance.name,
        schoolType: schoolInstance.schoolType,
        schoolDescr: '',
        features: [],
        directorName: getDirectorName(schoolInstance.director),
        extendedDayCost: '',
        dressCode: '',
        classes: getEducationInterval(
            schoolInstance.educationInterval,
            'classes'),
        kindergarten: getEducationInterval(
            schoolInstance.educationInterval,
            'kindergarten'),
        social: [],
        metroStations: services.address.getMetro(addresses),
        sites: getSites(schoolInstance.site),
        activities: getActivities(schoolInstance.activites),
        specializedClasses: [],
        contacts: getContacts(addresses, schoolInstance.phones),
        comments: getComments(comments),
        coords: services.address.getCoords(addresses),
        ratings: getRatings(schoolInstance.rank, schoolInstance.rankDogm),
        score: getScore(score, scoreCount),
        totalScore: checkScoreCount(schoolInstance.totalScore, scoreCount),
        reviewCount: checkScoreCount(schoolInstance.reviewCount, scoreCount)
    };
};

/**
 *  @param {array<number>} interval
 *  @param {string} type ['classes'|'kindergarten']
 *  @return {string}
 */
var getEducationInterval = function(interval, type) {
    var res = '';
    switch (type) {
        case 'classes':
            if (interval)
            {
                var begin = interval[0],
                    end = interval[interval.length - 1];

                if (begin === 0) {
                    begin = interval[1];
                }

                res += begin;

                if (end > begin) {
                    res += '–';
                    res += end;
                    res += ' классы';
                }
            }
            break;

        case 'kindergarten':
            if (interval[0] === 0) {
                res = 'При школе есть детский сад';
            }
            break;
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
        address: addressView.list(addresses, {
            filterByDepartment: true
        }),
        phones: phones || ''
    };
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
            var sections = comment.rating ?
                getSections(comment.rating.score) :
                getSections([0, 0, 0, 0]);
            return {
                author: '',
                rank: typeConvert[comment.userType],
                text: comment.text,
                sections: sections
            };
        });
};

/**
 *  @param {array<object>} Ratings array to convert
 *  @return {array<object>}
 */
var getSections = function(array) {
    return array ? array.map((item, index) => {
        var type = [
            'Образование',
            'Преподаватели',
            'Атмосфера',
            'Инфраструктура'
        ];
        return {
            name: type[index],
            value: item
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
 *  make from score and scoreCount array for template
 *  @param {array} score
 *  @param {array} scoreCount
 *  @return {array}
 */
var getScore = function(score, scoreCount) {
    var result = [];

    result = getSections(score);

    return result.map( (item, index) => {
        if (scoreCount[index] < 5) {
            item.value = 0;
        }
        return item;
    } );
};

/**
 *  checks amount of ratings for each score item and return 0 or param
 *  @param {number} param
 *  @param {array} scoreCount
 *  @return {number}
 */
var checkScoreCount = function(param, scoreCount) {
    var ratingsLack = false;

    scoreCount.forEach( (item) => {
        if (item < 5) {
            ratingsLack = true;
        }
    } );
    return ratingsLack ? 0 : param;
};


/**
 * translates director name to right output format
 * @param name string
 * @return string
 */
var getDirectorName = function(name) {
    var nameWords = [],
        result = '';
    name = name.trim();
    nameWords = name.split(' ');
    result = nameWords[1] + ' ' + nameWords[2] + ' ' + nameWords[0];
    return result;
};

/**
 *  @param {object} activity
 *  @return {array}
 */
var getActivities = function(activities) {
    return activityView.list(activities);
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
                totalScore: school.totalScore || 0,
                fullName: school.fullName,
                addresses: school.addresses
            };
        });
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

module.exports = schoolView;
