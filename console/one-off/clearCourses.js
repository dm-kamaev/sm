'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    sequelize = require('../../app/components/db');

const DELETE_QUERIES = [
    'DELETE FROM course_brand',
    'DELETE FROM course_category',
    'DELETE FROM course_type',
    'DELETE FROM address WHERE entity_type != \'school\'',
    'DELETE FROM page WHERE entity_type != \'school\''
];

module.exports = async(function() {
    await(DELETE_QUERIES.map(query =>
        sequelize.query(
            query, {
                type: sequelize.QueryTypes.DELETE
            }
        )
    ));
});

if (!module.parent) {
    module.exports();
}
