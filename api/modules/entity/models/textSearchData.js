'use strict';

const Sequelize = require('sequelize');

const sequelize = require('../../../../app/components/db'),
    entityTypes = require('../enums/entityType');

var TextSearchData = sequelize.define('TextSearchData', {
    entityId: {
        field: 'entity_id',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    entityType: {
        field: 'entity_type',
        type: Sequelize.STRING,
        unique: 'compositeIndex',
        validate: {
            isIn: [entityTypes.toArray()]
        }
    },
    formattedText: {
        field: 'formatted_text',
        type: Sequelize.STRING
    },
    originalText: {
        field: 'original_text',
        type: Sequelize.STRING
    }
}, {
    underscored: true,
    tableName: 'text_search_data'
});

module.exports = TextSearchData;
