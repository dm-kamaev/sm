const metroView = require.main.require('./api/modules/geo/views/metroView.js');
const departmentView = require.main.require('./api/modules/geo/views/departmentView.js');
const stages = require('../enums/departmentStage');

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
                stage: departmentView.classes(address.departments)
            };
        });
};

/**
 * @param {array<object>} addresses - address instances
 * @param {?object} opt_options
 * @param {?bool} opt_options.filterByDepartment
 * @return {array<object>}
 */
addressView.stageList = function (addresses, opt_options) {
    var addresses = this.list(addresses, opt_options),
        stagesEnum = [
            'Начальные классы',
            'Старшие и средние классы',
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
                        metroStations: addresses[j].metroStations
                      }
                );
                addressAdded = true;
            }
        }
        if (addressAdded) {
            stages.push(
                {
                    name: stagesEnum[i],
                    addresses: temp
                }
            );
        }
        temp = [];
    }
    return stages;

};

/**
 * returns metro names for departments from addresses array
 * @param {array<object>} addresses
 * @return {array<string>}
 */
addressView.getMetro = function(addresses) {
    metroStations = [];

    addresses = filterBydepartment(addresses);
    addresses.forEach(address => {
        if (address.metroStations.length > 0) {
            address.metroStations = metroView.list(address.metroStations);

            var isNewMetro = true;
            metroStations.forEach(metro => {
                if (metro === address.metroStations[0].name) {
                    isNewMetro = false;
                }
            });

            if (isNewMetro && address.metroStations[0].name !== null) {
                metroStations.push(address.metroStations[0].name);
            }
        }
    });
    return metroStations;
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
            result = true; //show addresses with no departments
        }
        else {
            var neededStage = address.departments.find(department => {
                if (department.stage == stages.ELEMENTARY ||
                    department.stage == stages.MIDDLE_HIDE)
                    return true;
            });

            if (neededStage) {
                result = true;
            }
        }
        return result;
    });

};


module.exports = addressView;
