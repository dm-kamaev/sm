const metroView = require('./metroView.js');
const areaView = require('./areaView.js');
const departmentView = require('./departmentView.js');
const lodashFlatten = require('lodash/array/flatten');

var addressView = {};


/**
 * @param {array<object>} addresses - address instances
 * @param {?object} opt_options
 * @param {?bool} opt_options.filterByDepartment
 * @return {array<object>}
 */
addressView.list = function(addresses, opt_options) {
    var options = opt_options || {};

    if (options.filterByDepartment) {
        addresses = filterBydepartment(addresses);
    }

    return addresses
        .map(address => {
            address.metroStations = address.dataValues.metroStations || [];
            address.departments = address.departments || [];
            return address;
        })
        .map(address => {
            return {
                title: '',
                description: address.name,
                metroStations: metroView.list(address.metroStations),
                stage: departmentView.departmentClasses(address.departments)
            };
        });
};

/**
 * @param {array<object>} addresses - address instances
 * @param {?object} opt_options
 * @param {?bool} opt_options.filterByDepartment
 * @return {array<object>}
 */
addressView.stageList = function(addresses, opt_options) {
    addresses = this.list(addresses, opt_options);
    var stagesEnum = [
            'Начальные классы',
            'Средние классы',
            'Старшие классы',
            'Начальные и средние классы',
            'Начальные и старшие классы',
            'Средние и старшие классы',
            '1 — 11 классы',
            'Другие адреса'
        ],
        stages = [],
        temp = [],
        addressAdded = false;
    for (var i = 0; i < stagesEnum.length; i++) {
        addressAdded = false;
        for (var j = 0; j < addresses.length; j++) {
            if (addresses[j].stage === stagesEnum[i]) {
                temp.push(
                    {
                        title: addresses[j].title,
                        description: addresses[j].description,
                        metroStation: addresses[j].metroStations[0]
                    }
                );
                addressAdded = true;
            }
        }
        if (addressAdded) {
            stages.push({
                name: stagesEnum[i],
                addresses: temp
            });
        }
        temp = [];
    }
    if (stages.length == 1 && stages[0].name === 'Другие адреса') {
        stages[0].name = 'Адреса';
    }
    return stages;
};


/**
 * Getter for school address for map
 * @param {Array.<Object>} addresses
 * @return {Array.<Object>}
 */
addressView.default = function(addresses) {
    return addresses
        .filter(address => address.isSchool)
        .map(address => ({
            id: address.id,
            lat: address.coords[0],
            lng: address.coords[1],
            name: address.name,
            stages: getStages_(address.departments)
        }));
};


/**
 * returns metro names for departments from addresses array
 * @param {Array<Object>} addresses
 * @return {Array<Object>}
 */
addressView.getMetro = function(addresses) {
    var metroStations =
        addresses
            .map(address => address.metroStations)
            .filter(metroStations => metroStations.length > 0)
            .map(metroStations => metroStations[0]);

    return metroView.list(metroStations);
};


/**
 * returns area names and ids for departments from addresses array
 * @param {Array<Object>} addresses
 * @return {Array<Object>}
 */
addressView.getArea = function(addresses) {
    var areas = addresses.map(address => address.area);

    return areaView.list(areas);
};


/**
 * Transforms school address for metro stations
 * @param {Object} school - school instance from sequalize
 */
addressView.transformSchoolAddress = function(school) {
    school.addresses = school.addresses.map(address => {
        address.metroStations = address.addressMetroes
            .map(item => item.metroStation);
        address.dataValues.metroStations = address.metroStations;

        return address;
    });
};


/**
 * @private
 * @param {array<object>} departments
 * @return {array<object>}
 */
var getStages_ = function(departments) {
    var result = [];
    var unical = {};
    var deps = departments || [];

    for (var i = 0, n = deps.length, dep; i < n; i++) {
        dep = deps[i];
        if (dep != undefined &&
            dep.educationalGrades &&
            !unical[dep.educationalGrades]) {
            unical[dep.educationalGrades] = true;
            result.push(dep.educationalGrades);
        }
    }

    return departmentView.classes(lodashFlatten(result));
};


/**
 * return filtered array with empty departments or with needed stages
 * @param {array<object>} addresses
 * @return {array<object>}
 */
var filterBydepartment = function(addresses) {
    return addresses.filter(address => {
        var result = false;
        if (!address.departments || !address.departments.length) {
            result = true; // show addresses with no departments
        } else {
            var neededStage = address.departments.find(department => {
                if (department.educationalGrades &&
                    department.educationalGrades.some(grade => grade > 0)) {
                    return true;
                }
            });

            if (neededStage) {
                result = true;
            }
        }
        return result;
    });
};


/**
 * Create map item from address model instance
 * @param  {models.Address} address
 * @return {{
 *     coordinates: Array<number>,
 *     title: {
 *         text: string,
 *         alias: string
 *     },
 *     description: string,
 *     name: string,
 *     score: number
 * }}
 */
addressView.mapItem = function(address) {
    return {
        coordinates: address.coords,
        title: {
            text: 'Центр «Максимум»',
            alias: 'school/search'
        },
        link: {
            text: 'Подготовка к ЕГЭ по русскому языку',
            alias: 'school/search'
        },
        description: '660 руб./занятие',
        addressName: address.name,
        score: 5 * Math.random()
    };
};


module.exports = addressView;
