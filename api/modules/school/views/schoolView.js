var services = require('../../../../app/components/services').all;
var lodash = require('lodash');

const areaView = require('../../geo/views/areaView.js');
const metroView = require('../../geo/views/metroView.js');
const addressView = require(
    '../../geo/views/addressView.js');
const activityView = require(
    './activityView.js');
const ratingView = require(
    './ratingView.js');
const egeResultView = require(
    '../../study/views/egeResultView.js');
const giaResultView = require(
    '../../study/views/giaResultView.js');
const olimpResultView = require(
    '../../study/views/olimpResultView.js');

const searchType = require('../enums/searchType');

var schoolView = {};


/**
 * @param {object} schoolInstance - school instance
 * @param {object} data
 * @param {object} user
 * @param {object} user.data
 * @param {string} user.isCommented
 * @param {?array<object>} opt_popularSchools - school instances
 * @return {object}
 */
schoolView.default = function(schoolInstance, data, user, opt_popularSchools) {
    addressView.transformSchoolAddress(schoolInstance);

    var addresses = services.department.addressesFilter(
            schoolInstance.addresses
        ),
        comments = schoolInstance.comments,
        score = getSections(schoolInstance.score),
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
        classes: getEducationInterval(schoolInstance.educationInterval),
        kindergarten: getKindergardenAvailability(
            schoolInstance.educationInterval
        ),
        social: [],
        //metroStations: addressView.getMetro(addresses),
        sites: schoolInstance.links ?
            getSites(schoolInstance.links) : getSites(schoolInstance.site),
        specializedClasses: getSpecializedClasses(
            schoolInstance.specializedClasses),
        activities: getActivities(schoolInstance.activities),
        contacts: getContacts(schoolInstance.addresses, schoolInstance.phones),
        comments: getComments(comments),
        addresses: addressView.default(addresses),
        ratings: ratingView.ratingSchoolView(
            schoolInstance.rank, schoolInstance.rankDogm),
        score: checkScoreValues(score) ? score : false,
        totalScore: schoolInstance.totalScore,
        results: {
            ege: egeResultView.transformResults(
                data.ege,
                data.city
            ),
            gia: giaResultView.transformResults(
                data.gia,
                data.city
            ),
            olymp: olimpResultView.transformResults(data.olymp)
        },
        authSocialLink: data.authSocialLink,
        reviewCount: schoolInstance.totalScore ?
            schoolInstance.reviewCount : 0,
        isCommented: user.isCommented,
        user: user.data
    };
    if (data.popularSchools) {
        result.popularSchools = this.popular(data.popularSchools);
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
            metro: nearestMetro(school.addresses),
            totalScore: school.totalScore
        };
    });
};

/**
 * @param {array<object>} addresses
 * @return {array<string>}
 */
var nearestMetro = function(addresses) {
    return lodash.uniq(addresses
        .map(address => {
            return address.addressMetroes[0] &&
                address.addressMetroes[0].metroStation.name
                    .replace('метро ', '');
        })
        .filter(address => address)
    );
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
            res = 'есть продлёнка';
            break;

        case 'бесплатно':
            res = 'есть бесплатная продлёнка';
            break;

        default:
            res = 'есть продлёнка (' + cost + ')';
    }

    return res;
};


/**
 *  @param {array<number>} interval
 *  @return {string}
 */
var getEducationInterval = function(interval, type) {
    var res = 'Обучение с ';

    if (interval)
    {
        var begin = interval[0],
            end = interval[interval.length - 1];

        if (begin === 0) {
            begin = interval[1];
        }

        res += begin;
        res += ' по ';
        res += end;
        res += ' класс';
    }
    else {
        res += '1 по 11 класс'
    }

    return res;
};


/**
 *  @param {array<number>} interval
 *  @return {string}
 */
var getKindergardenAvailability = function(interval) {
    return (interval && interval[0] === 0) ?
        'при школе есть детский сад' : '';
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
 *  @param {array<string>} opt_phones
 *  @return {object}
 */
var getContacts = function(addresses, opt_phones) {
    var phones = opt_phones || [];

    return {
        stages: addressView.stageList(addresses, {
            filterByDepartment: true
        }),
        phones: phones
            .map(phone => '8 ' + phone) // TODO: move to db
    };
};

/**
 *  @param {array<object>=} comments
 *  @return {array<object>}
 */
var getComments = function(comments) {
    var typeConvert = {
        'Parent': 'Родитель',
        'Graduate': 'Выпускник',
        'Scholar': 'Ученик'
    };

    return comments
        .filter(comment => comment.text)
        .map(comment => {
            var sections = getSections(comment.rating.score, true);
            return {
                author: '',
                rank: typeConvert[comment.userData.userType],
                text: comment.text,
                sections: sections
            };
        });
};

/**
 *  @param {array<object>=} opt_array Ratings to convert
 *  @param {boolean=} opt_withoutEmptySections
 *  @return {array<object>}
 */
var getSections = function(opt_array, opt_withoutEmptySections) {
    var array = opt_array || [0, 0, 0, 0];

    var sections = array.map((item, index) => {
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
    });

    return opt_withoutEmptySections ?
        sections.filter(item => item.value) :
        sections;
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
 * @param {number} opt_criterion
 * @return {object} contains results count and schools array
 */
schoolView.list = function(schools, opt_criterion) {
    var res = {};

    if (schools.length !== 0) {
        schools = groupSchools(schools);

        res.countResults = schools[0].countResults;
        res.schools = schools
            .map(school => {

                var score = getScore(school.score, school.totalScore, opt_criterion);
                var sortCriterion = score.shift();

                return {
                    id: school.id,
                    url: school.url,
                    name: getName(school.name),
                    description: school.description,
                    abbreviation: school.abbreviation,
                    score: score,
                    currentCriterion: sortCriterion,
                    fullName: school.fullName,
                    ratings: ratingView.ratingResultView(school.rankDogm),
                    metroStations: addressView.getMetro(school.addresses),
                    area: addressView.getAreas(school.addresses),
                    isScoreClickable: checkScoreValues(score, sortCriterion),
                    addresses:
                        services.department.addressesFilter(school.addresses),
                    totalScore: school.totalScore
                };
            });

    } else {
        res = {
            countResults: 0,
            schools: []
        };
    }
    return res;
};


/**
 * Group resutls of raw query to school object,
 * divide array of school objects for 2 parts for map
 * @param {Array.<Object>} schools - array of results of raw query
 * @param {Array.<number>} opt_centerCoords
 * @return {Object.<string, Array.<Object|number>>} contains results schools array and central coordinate
 * for the map
 */
schoolView.listMap = function(schools, opt_centerCoords) {
    var mapSchools = [];

    if (schools.length > 0) {
       mapSchools = groupSchools(schools).map(this.schoolMap);
    }

    return {
        schools: mapSchools,
        mapCenter: opt_centerCoords ?
            [opt_centerCoords[1], opt_centerCoords[0]] :
            null
    };
};

/**
 * Transform school object for map
 * @param {Object} school
 * @return {Object}
 */
schoolView.schoolMap = function(school) {
    return {
        addresses: addressView.default(school.addresses),
        id: school.id,
        name: school.name,
        description: school.description,
        url: school.url,
        totalScore: school.totalScore
    };
};

/**
 * @param {array<object>} schools - schoolInstances
 * @return {array<object>}
 */
schoolView.suggestList = function(schools) {
    return schools
        .map(school => {
            return {
                id: school.id,
                url: school.url,
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
 * Check if all scores of item is 0
 * @param {Array<Object>} score
 * @param {Object} opt_sortCriterion
 * @return {boolean}
 * @private
 */
var checkScoreValues = function(score, opt_sortCriterion) {
    var result = false;

    if (opt_sortCriterion && opt_sortCriterion.value !== 0) {
        result = true;
    }

    score.forEach(function(item) {
        if (item.value !== 0) {
            result = true;
        }
    });
    return result;
};

/**
 * Groups school objects to one object with addresses and metro arrays
 * @param {Array<Object>} schools
 * @return {Array<Object>}
 */
var groupSchools = function(schools) {
    var result = [],
        currentSchoolId = schools[0].id,
        grouppedById = [];

    //iterates l+1 times for last address of last school
    for(var i = 0, l = schools.length; i <= l; i++) {
        var schoolItem = schools[i];
        if (!schoolItem || schoolItem.id !== currentSchoolId) {

            var resultItem = {};

            //Copy fiels from one school to result school that not changes
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

            //iterates over schools with same address
            lodash.forEach(grouppedByAddress, (schools, key) => {
                resultItem.addresses.push({
                    id: key,
                    metroStations: [],
                    area: {},
                    departments: []
                });

                lodash.forEach(schools, (school) => {
                    var currentAddress = resultItem
                        .addresses[resultItem.addresses.length - 1];

                    var isNewMetro = true;
                    //checks that current metro is not in metro array already
                    lodash.forEach(currentAddress.metroStations, (station)=>{
                        if(station.id === school.metroId) {
                            isNewMetro = false;
                        }
                    });
                    //if this is new mero than push it into metro array
                    if(isNewMetro && school.metroId !== null) {
                        currentAddress.metroStations
                            .push({
                                id: school.metroId,
                                name: school.metroName
                            });
                    }

                    var isNewDepartment = true;
                    //checks that current department is not in metro array already
                    lodash.forEach(currentAddress.departments, (department) => {
                        if(department.stage === school.departmentStage) {
                            isNewDepartment = false;
                        }
                    });

                    //if this is new department than push it into metro array
                    if (isNewDepartment  && school.departmentStage !== null) {
                        currentAddress.departments.push({
                            stage: school.departmentStage
                        });
                    }

                    currentAddress.area.id = school.areaId;
                    currentAddress.area.name = school.areaName;

                    currentAddress.name = school.addressName;
                    currentAddress.coords = school.addressCoords;
                });
            });

            result.push(resultItem);

            if(schoolItem) {
                currentSchoolId = schoolItem.id;
            }

            grouppedById = [];
        }
        grouppedById.push(schoolItem);
    }
    return result;
};

/**
 * Return array like [criterion, otherScore]
 * @param {array} score
 * @param {number} totalScore
 * @param {number} opt_criterion
 * @return {Array<Object>}
 */
var getScore = function(score, totalScore, opt_criterion) {
    var scoreItems = getSections(score),
        sortCriterionIndex = opt_criterion ? opt_criterion : 0;

    scoreItems.unshift({
        name: 'Средняя оценка',
        value: totalScore
    });

    scoreItems.unshift(scoreItems.splice(sortCriterionIndex, 1)[0]);
    return scoreItems;
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
 * @param {Object} data
 * @param {Array.<Object>} data.schools - school instances
 * @param {Array.<Object>} data.areas - area instances
 * @param {Array.<Object>} data.metros - metro instances
 * @return {Array.<Object>}
 */
schoolView.suggest = function(data) {
    return {
        schools: this.suggestList(data.schools),
        areas: areaView.list(data.areas),
        metro: metroView.list(data.metros)
    };
};


 /**
 * @return {array<object>}
 */
schoolView.dataLinks = function() {
    var searchUrl = '/search?name=';

    return [
        {
          name: 'Школа 123',
          url: searchUrl +
            encodeURIComponent('школа 123')
        },
        {
          name: 'Тургеневская',
          url: searchUrl +
            encodeURIComponent('Тургеневская') + '&metroId=122'
        },
        {
          name: 'Лицей',
          url: searchUrl +
            encodeURIComponent('Лицей')
        },
        {
          name: 'Замоскворечье',
          url: searchUrl +
            encodeURIComponent('Замоскворечье')
        }
    ];
};

module.exports = schoolView;
