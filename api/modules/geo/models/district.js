const DataType = require('sequelize'),
    db = require('../../../../app/components/db');

var District = db.define(
    'District',
    {
        name: {
            type: DataType.STRING
        },
        centerCoords: {
            type: DataType.ARRAY(DataType.FLOAT),
            field: 'center_coords'
        }
    },
    {
        underscored: true,
        tableName: 'district',
        classMethods: {
            associate: function(models) {
                District.hasMany(models.Address, {
                    as: 'addresses',
                    foreignKey: 'district_id'
                });
            }
        }
    }
);

module.exports = District;
