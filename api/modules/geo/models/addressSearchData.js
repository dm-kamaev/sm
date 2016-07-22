var Sequelize = require('sequelize');

var sequelize = require('../../../../app/components/db'),
    addressSearchType = require('../enums/addressSearchType'),
    entityTypes = require('../../entity/enums/entityType');

var AddressSearchData = sequelize.define('AddressSearchData', {
    entityId: {
        type: Sequelize.INTEGER,
        field: 'entity_id'
    },
    entityType: {
        type: Sequelize.STRING,
        field: 'entity_type',
        validate: {
            isIn: [entityTypes.toArray()]
        }
    },
    addressId: {
        type: Sequelize.INTEGER,
        field: 'address_id',
        onDelete: 'cascade',
        references: {
            model: 'address',
            key: 'id'
        }
    },
    values: Sequelize.ARRAY(Sequelize.INTEGER),
    type: {
        type: Sequelize.STRING,
        validate: {
            isIn: [addressSearchType.toArray()]
        }
    }
}, {
    underscored: true,
    tableName: 'address_search_data',
    classMethods: {
        associate: function(models) {
            AddressSearchData.belongsTo(models.Address, {
                as: 'address', foreignKey: 'address_id'
            });
        }
    }
});

module.exports = AddressSearchData;
