var Sequelize = require('sequelize');

var sequelize = require('../../../../app/components/db'),
    addressSearchType = require('../enums/addressSearchType');

var AddressSearchData = sequelize.define('AddressSearchData', {
    'address_id': {
        type: Sequelize.INTEGER,
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
