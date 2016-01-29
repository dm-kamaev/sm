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
        addresses = addresses.filter(address => {
            if (!address.departments || !address.departments.length)
                return true; //show addresses with no departments
            var neededStage = address.departments.find(department => {
                if (department.stage == stages.ELEMENTARY ||
                    department.stage == stages.MIDDLE_HIDE)
                    return true;
            });
            if (neededStage)
                return true;
        });
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
                departments: departmentView.list(address.departments)
            };
        });
};

module.exports = addressView;
