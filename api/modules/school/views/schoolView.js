'use strict';

const services = require('../../../../app/components/services').all;
const lodash = require('lodash');

const areaView = require('../../geo/views/areaView.js');
const metroView = require('../../geo/views/metroView.js');
const addressView = require(
    '../../geo/views/addressView.js');
const districtView = require('../../geo/views/districtView');
const activityView = require(
    './activityView.js');
const specializedClassesView = require(
    './specializedClassesView.js');
const ratingView = require(
    './ratingView.js');
const egeResultView = require(
    '../../study/views/egeResultView.js');
const giaResultView = require(
    '../../study/views/giaResultView.js');
const olimpResultView = require(
    '../../study/views/olimpResultView.js');
const scoreView = require('../views/scoreView');
const scoreEntityView = require('../../entity/views/scoreView');
const seoView = require('./seoView.js');

const commentView = require('../../comment/views/commentView');

const entityType = require('../../entity/enums/entityType');

let schoolView = {};


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
        comments = commentView.school(schoolInstance.comments);
    var result = {
        id: schoolInstance.id,
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
        sites: schoolInstance.links ?
            getSites(schoolInstance.links) : getSites(schoolInstance.site),
        specializedClasses: specializedClassesView.list(
            schoolInstance.specializedClasses,
            data.specializedClassTypes
        ),
        activities: activityView.list(schoolInstance.activities),
        contacts: getContacts(schoolInstance.addresses, schoolInstance.phones),
        comments: comments,
        addresses: addressView.default(addresses),
        ratings: ratingView.ratingSchoolView(
            schoolInstance.rank, schoolInstance.rankDogm),
        score: scoreView.school(schoolInstance.score),
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
        authSocialLinks: data.authSocialLinks,
        reviewCount: schoolInstance.totalScore ?
            schoolInstance.reviewCount : 0,
        isFavorite: schoolView.isFavorite(schoolInstance, data.favorites.items),
        user: user,
        favorites: {
            schools: schoolView.listCompact(data.favorites)
        },
        seoDescription: data.page.description,
        seoLinks: seoView.linksList(data.seoLinks)
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
            alias: school.alias,
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
                address.addressMetroes[0].metro.name
                    .replace('метро ', '');
        })
        .filter(address => address)
    );
};

/**
 * @param {string} cost
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
 * @param {array<number>} interval
 * @return {string}
 */
var getEducationInterval = function(interval) {
    var res = 'Обучение с ';

    if (interval) {
        var begin = interval[0],
            end = interval[interval.length - 1];

        if (begin === 0) {
            begin = interval[1];
        }

        res += begin;
        res += ' по ';
        res += end;
        res += ' класс';
    } else {
        res += '1 по 11 класс';
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
 *  @param {string|array<string>} sites
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
 * translates director name to right output format
 * @param {string} name
 * @return {string}
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
 * @param {Array<Object>} schoolInstances
 * @param {number=} opt_sortCriterion
 * @return {Object} contains results count and schools array
 */
schoolView.list = function(schoolInstances, opt_sortCriterion) {
    let schoolList = [];

    if (schoolInstances.length) {
        let schools = groupSchools(schoolInstances);

        schoolList = schools.map(school =>
            schoolView.getListSchool(school, opt_sortCriterion)
        );
    }
    return schoolList;
};


/**
 * @param  {Object} school
 * @param  {number=} opt_sortCriterion
 * @return {Object}
 */
schoolView.getListSchool = function(school, opt_sortCriterion) {
    return {
        id: school.id,
        alias: entityType.SCHOOL + '/' + school.alias,
        type: entityType.SCHOOL,
        name: getName(school.name),
        description: school.description,
        score: scoreEntityView.results(
            school.score,
            school.totalScore,
            opt_sortCriterion
        ),
        metro: addressView.getMetro(school.addresses) || [],
        area: [addressView.getArea(school.addresses)[0]]
    };
};


/**
 * Group resutls of raw query to school object,
 * @param {Array<Object>} schools - array of results of raw query
 * @return {Array<Object>}
 */
schoolView.listMap = function(schools) {
    let items = [];

    if (schools.length > 0) {
        let schoolsData = groupSchools(schools);

        schoolsData.forEach(school => {
            let schoolItems = schoolView.getMapItems(school);
            items = items.concat(schoolItems);
        });
    }
    return items;
};


/**
 * Generate map items from one school and all its addresses
 * @param {Object} school
 * @return {{
 *     addressId: number,
 *     addressName: string,
 *     coordinates: Array<number>,
 *     score: number,
 *     title: {
 *         id: number,
 *         text: string,
 *         url: null
 *     },
 *     subtitle: string,
 *     items: Array<{
 *         id: number,
 *         content: string,
 *         url: null
 *     }>
 * }}
 */
schoolView.getMapItems = function(school) {
    let addresses = addressView.default(school.addresses);
    return addresses.length ?
        addresses.map(address => {
            return {
                id: school.id,
                header: {
                    title: school.name,
                    description: address.stages
                },
                description: {
                    text: school.description,
                    link: {
                        text: 'Подробнее',
                        url: entityType.SCHOOL + '/' + school.alias
                    }
                },
                content: {
                    items: []
                },
                footer: {
                    title: address.name
                },
                addressId: address.id,
                addressName: address.name,
                coordinates: [address.lat, address.lng],
                score: school.totalScore,
                title: {
                    id: school.id,
                    text: school.name,
                    url: entityType.SCHOOL + '/' + school.alias
                },
                subtitle: address.stages && address.stages != 'Другие адреса' ?
                    address.stages + ' ' + address.name :
                    address.name
            };
        }) :
        [];
};


/**
 * Group resutls of raw query to school object,
 * divide array of school objects for 2 parts for map
 * @param {Array.<Object>} schools - array of results of raw query
 * @param {{
 *     position: Array.<number>,
 *     type: string
 * }} opt_position
 * @return {{
 *     schools: Array.<Object>,
 *     position: {
 *         center: Array.<number>,
 *         type: string
 *     }
 * }} contains results schools array and position perferences for map
 */
schoolView.listMapLegacy = function(schools, opt_position) {
    var mapSchools = [];

    if (schools.length > 0) {
        mapSchools = groupSchools(schools).map(this.schoolMapLegacy);
    }

    return {
        schools: mapSchools,
        position: opt_position
    };
};


/**
 * Transform school object for map
 * @param {Object} school
 * @return {Object}
 */
schoolView.schoolMapLegacy = function(school) {
    return {
        addresses: addressView.default(school.addresses),
        id: school.id,
        name: school.name,
        description: school.description,
        alias: school.alias,
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
                alias: school.alias,
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
 * @param {array<object>} schools
 * @param {array<object>} aliases
 * @return {array<object>}
 */
schoolView.joinAliases = function(schools, aliases) {
    return schools.map(school => {
        school.alias = getAlias(aliases, school.id);
        return school;
    });
};

/**
 * @param {Array<Object>} schoolAliases
 * @param {number} schoolId
 * @return {string}
 */
var getAlias = function(schoolAliases, schoolId) {
    return lodash.find(schoolAliases, {entityId: schoolId}).alias;
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

    // iterates l+1 times for last address of last school
    for (var i = 0, l = schools.length; i <= l; i++) {
        var schoolItem = schools[i];
        if (!schoolItem || schoolItem.id !== currentSchoolId) {
            var resultItem = {};

            // Copy fiels from one school to result school that not changes
            lodash.forOwn(grouppedById[0], (value, key) => {
                if (key !== 'addressId' &&
                    key !== 'metroId' &&
                    key !== 'metroName' &&
                    key !== 'departmentStage') {
                    resultItem[key] = value;
                }
            });

            var grouppedByAddress = lodash.groupBy(grouppedById, 'addressId');
            resultItem.addresses = [];

            // iterates over schools with same address
            lodash.forEach(grouppedByAddress, (schools, key) => {
                resultItem.addresses.push({
                    id: key,
                    metroStations: [],
                    area: {},
                    departments: []
                });

                lodash.forEach(schools, school => {
                    var currentAddress = resultItem
                        .addresses[resultItem.addresses.length - 1];

                    var isNewMetro = true;
                    // checks that current metro is not in metro array already
                    lodash.forEach(currentAddress.metroStations, station => {
                        if (station.id === school.metroId) {
                            isNewMetro = false;
                        }
                    });
                    // if this is new mero than push it into metro array
                    if (isNewMetro && school.metroId !== null) {
                        currentAddress.metroStations
                            .push({
                                id: school.metroId,
                                name: school.metroName
                            });
                    }

                    var isNewDepartment = true;
                    // checks that current department is not
                    // in metro array already
                    lodash.forEach(currentAddress.departments, department => {
                        if (department.educationalGrades ===
                            school.departmentEducationalGrades) {
                            isNewDepartment = false;
                        }
                    });

                    // if this is new department than push it into metro array
                    if (isNewDepartment &&
                        school.departmentEducationalGrades !== null) {
                        currentAddress.departments.push({
                            educationalGrades:
                                school.departmentEducationalGrades
                        });
                    }

                    currentAddress.area.id = school.areaId;
                    currentAddress.area.name = school.areaName;

                    currentAddress.name = school.addressName;
                    currentAddress.isSchool = school.addressIsSchool;
                    currentAddress.coords = school.addressCoords;
                });
            });

            result.push(resultItem);

            if (schoolItem) {
                currentSchoolId = schoolItem.id;
            }

            grouppedById = [];
        }
        grouppedById.push(schoolItem);
    }
    return result;
};


/**
 * Makes name object from name string
 * @param {string} name
 * @return {Object}
 */
var getName = function(name) {
    var result = {
            'light': '',
            'bold': ''
        },
        char,
        numberFounded = false;

    for (var i = 0, l = name.length; i < l; i++) {
        char = name.charAt(i);

        if (char === '№') {
            numberFounded = true;
        }

        numberFounded ?
            result.bold += char :
            result.light += char;
    }
    return result;
};

/**
 * @param {{
 *    schools: Array<models.School>,
 *    areas: Array<models.Area>,
 *    metro: Array<models.Metro>,
 *    districts: Array<models.District>
 * }} data
 * @return {{
 *     schools: Array<Object>,
 *     areas: Array<Object>,
 *     metro: Array<Object>,
 *     districts: Array<Object>
 * }}
 */
schoolView.suggest = function(data) {
    return {
        schools: this.suggestList(data.schools),
        areas: areaView.list(data.areas),
        metro: metroView.list(data.metros),
        districts: districtView.list(data.districts)
    };
};

 /**
 * @return {array<object>}
 */
schoolView.dataLinks = function() {
    var searchUrl = '/school?name=';

    return [
        {
            name: 'Школа 1234',
            url: searchUrl +
            encodeURIComponent('школа 1234')
        },
        {
            name: 'Новослободская',
            url: searchUrl +
            encodeURIComponent('Новослободская') + '&metroId=67'
        },
        {
            name: 'Лицей',
            url: searchUrl +
            encodeURIComponent('Лицей')
        },
        {
            name: 'Тимирязевский',
            url: searchUrl +
            encodeURIComponent('Тимирязевский')
        }
    ];
};


/**
 * @param {{
 *     items: models.School,
 *     itemUrls: models.School
 * }} schoolsData
 * @return {Array<{
 *         id: number,
 *         name: {
 *             light: (undefined|string),
 *             bold: (undefined|string)
 *         },
 *         alias: (undefined|string),
 *         score: (undefined|number),
 *         metroStations: (undefined|Array<{
 *             id: number,
 *             name: string
 *         }>),
 *         area: (undefined|{
 *             id: number,
 *             name: string
 *         })
 *     }>
 * }>}
 */
schoolView.listCompact = function(schoolsData) {
    var schools = schoolsData.items,
        itemUrls = schoolsData.itemUrls;
    return schools.map(school => {
        return {
            id: school.id,
            name: getName(school.name),
            score: scoreView.schoolListCompact(school.totalScore),
            metroStations: addressView.nearestMetro(school.addresses),
            area: addressView.getArea(school.addresses)[0],
            alias: getAlias(itemUrls, school.id)
        };
    });
};

/**
 * @param {{
 *     item: models.School,
 *     itemUrl: models.Page
 * }} schoolData
 * @return {{
 *     id: number,
 *     name: {
 *         light: (undefined|string),
 *         bold: (undefined|string)
 *     },
 *     alias: (undefined|string),
 *     score: {
 *         data: {
 *             visibleMark: {
 *                 name: (undefined|string),
 *                 value: (undefined|number)
 *             },
 *             hiddenMarks: Array<{
 *                 name: (undefined|string),
 *                 value: (undefined|number)
 *             }>
 *         }
 *     },
 *     metroStations: (undefined|Array<{
 *         id: number,
 *         name: string
 *     }>),
 *     area: (undefined|{
 *         id: number,
 *         name: string
 *     })
 * }}
 */
schoolView.listCompactItem = function(schoolData) {
    var school = schoolData.item,
        page = schoolData.itemUrl;

    return {
        id: school.id,
        name: getName(school.name),
        score: scoreView.schoolListCompact(school.totalScore),
        metroStations: addressView.nearestMetro(school.addresses),
        area: addressView.getArea(school.addresses)[0],
        alias: page.alias
    };
};


/**
 * Check that school in given favorites
 * @param {models.School} school
 * @param {Array<models.School>} favoriteItems
 * @return {boolean}
 */
schoolView.isFavorite = function(school, favoriteItems) {
    return favoriteItems.some(favoriteItem => {
        return favoriteItem.id == school.id;
    });
};

/**
 * Get array of unique school's ids
 * @param {Array<Object>} schools
 * @return {Array<number>}
 */
schoolView.uniqueIds = function(schools) {
    return lodash.uniq(schools.map(school => school.id));
};


/**
 * Used for item of list favorites
 * @param {{
 *     entity: models.School,
 *     type: string,
 *     url: models.Page
 * }} data
 * @return {{
 *     id: number,
 *     type: string,
 *     name: {
 *         light: string,
 *         bold: ?string
 *     },
 *     alias: string,
 *     score: number,
 *     metro: ?Array<{
 *         id: number,
 *         name: string
 *     }>,
 *     area: ?Array<{
 *         id: number,
 *         name: string
 *     }>,
 *     category: string
 * }}
 */
schoolView.item = function(data) {
    var entity = data.entity,
        type = data.type,
        url = data.alias;

    return {
        id: entity.id,
        type: type,
        name: {light: entity.name},
        score: entity.totalScore,
        metro: addressView.nearestMetro(entity.addresses),
        area: addressView.getArea(entity.addresses),
        alias: entityType.SCHOOL + '/' + url.alias
    };
};

module.exports = schoolView;
