
var services = require.main.require('./app/components/services').all;
var lodash = require('lodash');

const areaView = require.main.require('./api/modules/geo/views/areaView.js');
const metroView = require.main.require('./api/modules/geo/views/metroView.js');
const addressView = require.main.require(
    './api/modules/geo/views/addressView.js');
const activityView = require.main.require(
    './api/modules/school/views/activityView.js');
const ratingView = require.main.require(
    './api/modules/school/views/ratingView.js');

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
            getSites(schoolInstance.links) : getSites(schoolInstance.site),
        specializedClasses: getSpecializedClasses(
            schoolInstance.specializedClasses),
        activities: getActivities(schoolInstance.activites),
        contacts: getContacts(addresses, schoolInstance.phones),
        comments: getComments(comments),
        addresses: services.address.getAddress(addresses),
        ratings: ratingView.ratingSchoolView(
            schoolInstance.rank, schoolInstance.rankDogm),
        score: getSections(score),
        totalScore: schoolInstance.totalScore,
        reviewCount: schoolInstance.totalScore ?
            schoolInstance.reviewCount : 0
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
        stages: addressView.stageList(addresses, {
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
    var res = [];

    schools = groupSchools(schools);
    res = schools
        .map(school => {
            return {
                id: school.id,
                url: school.url,
                name: getName(school.name),
                description: school.description,
                abbreviation: school.abbreviation,
                score: getSections(school.score || [0, 0, 0, 0]),
                totalScore: school.totalScore,
                fullName: school.fullName,
                ratings: ratingView.ratingResultView(school.rankDogm),
                metroStations: addressView.getMetro(school.addresses)
            };
        });
    res.sort(function (item1, item2) {
        return compareItems(item1, item2);
    });

    return res;
};

/**
 * Groups school objects to one object with addresses and metro arrays
 * @param {Array<Object>} schools
 * @return {Array}
 */
var groupSchools = function(schools) {
    var result;

    result = lodash.groupBy(schools, 'id');

    result = lodash.map(result, function(grouppedById) {
            var resultItem = {};

            lodash.forOwn(grouppedById[0], (value, key) => {
                if (key !== 'addressId'
                    && key !== 'metroId'
                    && key !== 'metroName'
                    && key !== 'departmentStage') {
                    resultItem[key] = value;
                }
            });

            var grouppedByAddress = lodash.groupBy(grouppedById, 'addressId');

            resultItem.addresses = [];
            lodash.forEach(grouppedByAddress, (schools, key) => {
                resultItem.addresses.push({
                    id: key,
                    metroStations: [],
                    departments: []
                });


                lodash.forEach(schools, (school) => {
                    var currentAddress = resultItem
                        .addresses[resultItem.addresses.length - 1];

                    var isNewMetro = true;
                    lodash.forEach(currentAddress.metroStations, (station)=>{
                        if(station.id === school.metroId) {
                            isNewMetro = false;
                        }
                    });
                    if(isNewMetro && school.metroId !== null) {
                        currentAddress.metroStations
                            .push({
                                id: school.metroId,
                                name: school.metroName
                            });
                    }

                    var isNewDepartment = true;
                    lodash.forEach(currentAddress.departments, (department) => {
                        if(department.stage === school.departmentStage) {
                            isNewDepartment = false;
                        }
                    });

                    if (isNewDepartment  && school.departmentStage !== null) {
                        currentAddress.departments.push({
                            stage: school.departmentStage
                        });
                    }

                });
            });
            return resultItem;
    });
    return result;
};


/**
 * Compare two items for sort result array in school list
 * @param {Object} item1
 * @param {Object} item2
 * @return {number}
 */
var compareItems = function (item1, item2) {
    var result;

    result = item2.totalScore - item1.totalScore;

    if (result === 0) {
        var itemZeroScore,
            thisZeroScore;

        firstZeroScore = checkScore(item1.score);
        secondZeroScore = checkScore(item2.score);

        if (firstZeroScore && !secondZeroScore) {
            result = 1;
        }
        else if (!firstZeroScore && secondZeroScore) {
            result = -1;
        }
        else {
            result = item1.id - item2.id;
        }
    }

    return result;
};

/**
 * Makes name object from name string
 * @param {string} name
 * @return {Object}
 */
var getName = function (name) {
    var result = {
            'light': '',
            'bold': ''
        },
        char,
        numberFounded = false;

    for(i = 0, l = name.length; i < l; i++) {
        char = name.charAt(i);

        if(char === '№') {
            numberFounded = true;
        }

        numberFounded ?
            result.bold += char :
            result.light += char;
    }
    return result;
};

/**
 * Compare input array with null score:[0, 0, 0, 0]
 * and return true if they equals
 * @param {Array} score
 * @return {boolean}
 */
var checkScore = function(score) {
    var nullScore = [0, 0, 0, 0],
        result = true;

    for (var i = 0, l = score.length; i < l; i++) {
        if (score[i].value != nullScore[i]) {
            result = false;
        }
    }
    return result;
};

/**
 * @param {array<object>} schools - schoolInstances
 * @return {array<object>}
 */
schoolView.listMapPoints = function(schools) {
    return schools
        .map(school => {
            school = school.dataValues;
            return {
                id: school.id,
                url: school.url,
                name: school.name,
                totalScore: school.totalScore || 0,
                addresses: [{
                    lat: school.coords[0],
                    lng: school.coords[1],
                    name: school.adrName,
                    stage: [school.stage]
                }]
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
