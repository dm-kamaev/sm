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
const egeResultView = require.main.require(
    './api/modules/study/views/egeResultView.js');
const giaResultView = require.main.require(
    './api/modules/study/views/giaResultView.js');
const olimpResultView = require.main.require(
    './api/modules/study/views/olimpResultView.js');

var schoolView = {};


/**
 * @param {object} schoolInstance - school instance
 * @param {object} results
 * @param {?array<object>} opt_popularSchools - school instances
 * @return {object}
 */
schoolView.default = function(schoolInstance, results, opt_popularSchools) {
    addressView.transformSchoolAddress(schoolInstance);

    var addresses = services.department.addressesFilter(schoolInstance.addresses),
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
        // metroStations: services.address.getMetro(addresses),
        sites: schoolInstance.links ?
            getSites(schoolInstance.links) : getSites(schoolInstance.site),
        specializedClasses: getSpecializedClasses(
            schoolInstance.specializedClasses),
        activities: getActivities(schoolInstance.activites),
        contacts: getContacts(schoolInstance.addresses, schoolInstance.phones),
        comments: getComments(comments),
        addresses: addressView.default(addresses),
        ratings: ratingView.ratingSchoolView(
            schoolInstance.rank, schoolInstance.rankDogm),
        score: getSections(score),
        totalScore: schoolInstance.totalScore,
        results: {
            ege: egeResultView.transformResults(
                results.ege,
                results.city
            ),
            gia: giaResultView.transformResults(
                results.gia,
                results.city
            ),
            olymp: olimpResultView.transformResults(results.olymp)
        },
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
                    isScoreClickable: checkScoreValues(score, sortCriterion)
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
 * @param {Object} sortCriterion
 * @return {boolean}
 * @private
 */
var checkScoreValues = function(score, sortCriterion) {
    var result = false;

    if (sortCriterion.value !== 0) {
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
    var scoreItems = getSections(score || [0,0,0,0]),
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
        schools: this.suggestList(data.schools),
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
