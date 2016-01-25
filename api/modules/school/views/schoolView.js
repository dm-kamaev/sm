
var services = require.main.require('./app/components/services').all;

const areaView = require.main.require('./api/modules/geo/views/areaView.js');
const metroView = require.main.require('./api/modules/geo/views/metroView.js');
const addressView = require.main.require(
    './api/modules/geo/views/addressView.js');
const activityView = require.main.require(
    './api/modules/school/views/activityView.js');

var schoolView = {};

/**
 * @param {object} schoolInstance - school instance
 * @param {?array<object>} opt_popularSchools - school instances
 * @return {object}
 */

schoolView.default = function(schoolInstance, opt_popularSchools) {

    var addresses =
            services.department.addressesFilter(schoolInstance.addresses),
        comments = schoolInstance.commentGroup ?
            schoolInstance.commentGroup.comments : [],

        score = schoolInstance.score || [0, 0, 0, 0],
        scoreCount = schoolInstance.scoreCount || [0, 0, 0, 0];

    var result = {
        id: schoolInstance.id,
        url: schoolInstance.url,
        schoolName: schoolInstance.name,
        schoolType: schoolInstance.schoolType,
        schoolDescr: schoolInstance.description,
        features: schoolInstance.features,
        directorName: getDirectorName(schoolInstance.director),
        extendedDayCost: getExtendedDayCost(schoolInstance.extendedDayCost),
        dressCode: schoolInstance.dressCode || false,
        classes: getEducationInterval(
            schoolInstance.educationInterval,
            'classes'),
        kindergarten: getEducationInterval(
            schoolInstance.educationInterval,
            'kindergarten'),
        social: [],
        metroStations: services.address.getMetro(addresses),
        sites: schoolInstance.links ?
            getSites(schoolInstance.links) :
            getSites(schoolInstance.site),
        specializedClasses: getSpecializedClasses(
            schoolInstance.specializedClasses
        ),
        activities: getActivities(schoolInstance.activites),
        contacts: getContacts(addresses, schoolInstance.phones),
        comments: getComments(comments),
        addresses: services.address.getAddress(addresses),
        ratings: getRatings(schoolInstance.rank, schoolInstance.rankDogm),
        score: getScore(score, scoreCount),
        totalScore: checkScoreCount(schoolInstance.totalScore, scoreCount),
        reviewCount: checkScoreCount(schoolInstance.reviewCount, scoreCount)
    };

    if (opt_popularSchools) {
        result.popularSchools = this.popular(opt_popularSchools);
    }
    return result;
};

/**
 * @param {array<object>} popularSchools school instances
 * @return {array<object>}
 */
schoolView.popular = function(popularSchools) {
    return popularSchools.map(school => {
        return {
            id: school.id,
            url: school.url,
            name: school.name,
            description: school.description || '',
            metro: services.address.getMetro(school.addresses),
            totalScore: school.totalScore
        };
    });
};

/**
 * @param cost
 * @return {string}
 */
var getExtendedDayCost = function(cost) {
    var res = '';

    switch (cost) {
        case 'нет':
        case '-':
        case null:
            break;

        case 'есть':
            res = 'Есть продлёнка';
            break;

        case 'бесплатно':
            res = 'Есть бесплатная продлёнка';
            break;

        default:
            res = 'Есть продлёнка, ' + cost;
    }

    return res;
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
var getSites = function(sites) {
    if (Array.isArray(sites)) {
        return sites.map(site => {
            return {
                name: site[0],
                href: site[1].indexOf('http') > -1 ?
                    site[1] :
                    'http://' + site[1],
                link: site[1]
            };
        });
    } else {
        return [{
                name: 'Сайт школы',
                href: 'http://' + sites,
                link: sites
        }];
    }
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

var getSpecializedClasses = function(specializedClasses) {
    var result = [],
        grade = '',
        index = -1;
    if (specializedClasses) {
        for (var i = 0,
                l = specializedClasses.length,
                specializedClass, specialLevel; i < l; i++) {
            specializedClass = specializedClasses[i];
            specialLevel = schoolGradeToLevel(specializedClass[0])



            if (grade !== specialLevel) {
                grade = specialLevel;

                result.push({
                    'name': grade,
                    'items': []
                });
                index += 1;
            }

            if (result[index].items.indexOf(specializedClass[1]) === -1) {
                result[index].items.push(specializedClass[1]);
            }
        }
    }

    return result;
};

 /**
  * @param {number} grade
  * @return {string}
  */
var schoolGradeToLevel = function(grade) {
    console.log(grade);
    if (grade < 5) {
        return 'Начальная школа';
    } else if (grade < 9) {
        return 'Средняя школа';
    } else {
        return 'Старшая школа'
    }
}

/**
 *  @param {object} activities
 *  @return {array}
 */
var getActivities = function(activities) {
    return activityView.list(activities);
};

var getStages = function(departments) {
    var result = [];
    var unical = {};
    var deps = departments || [];

    for (var i = 0, n = deps.length, dep; i < n; i++) {
        dep = deps[i];
        if (dep != undefined && dep.stage && !unical[dep.stage]) {
            unical[dep.stage] = true;
            result.push(dep.stage);
        }
    }

    return result;
};

/**
 * @param {array<object>} schools - schoolInstances
 * @return {array<object>}
 */
schoolView.list = function(schools) {
    return schools
        .map(school => {
            return {
                id: school.id,
                url: school.url,
                name: school.name,
                description: '',
                abbreviation: school.abbreviation,
                score: school.score ?
                    getSections(school.score) :
                    getSections([0,0,0,0]),
                totalScore: school.totalScore || 0,
                fullName: school.fullName,
                addresses: school.addresses
            };
        });
};

/**
 * @param {array<object>} schools - schoolInstances
 * @return {array<object>}
 */
schoolView.listMapPoints = function(schools) {
    return schools
        .map(school => {
            return {
                id: school.id,
                url: school.url,
                name: school.name,
                totalScore: school.totalScore || 0,
                addresses: services.address.getAddress(school.addresses)
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
               res.data.name = 'schoolType';
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
