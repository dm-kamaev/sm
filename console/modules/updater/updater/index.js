'use strict';

const School = require('./tables/School');

module.exports = function(rows, parsers) {
    var schools = getSchools(rows, parsers);
    schools.forEach(
        school => {
            school.update();
        }
    );
};

var getSchools = function(rows, parsers) {
    return rows.map(
        row => {
            return new School(row, parsers);
        }
    );
};
