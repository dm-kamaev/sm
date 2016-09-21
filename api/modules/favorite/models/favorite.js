var DataType = require('sequelize'),
    db = require('../../../../app/components/db');

const entityType = require('../../entity/enums/entityType');

var Favorite = db.define(
    'Favorite',
    {
        userId: {
            type: DataType.INTEGER,
            field: 'user_id'
        },
        entityId: {
            type: DataType.INTEGER,
            field: 'entity_id'
        },
        entityType: {
            field: 'entity_type',
            type: DataType.ENUM,
            values: entityType.toArray(),
            allowNull: false
        },
        createdAt: {
            type: DataType.DATE,
            field: 'created_at'
        }
    },
    {
        underscored: true,
        tableName: 'favorite',
        classMethods: {
            associate: function(models) {
                Favorite.belongsTo(models.School, {
                    as: 'entity',
                    foreignKey: 'entity_id'
                });
                Favorite.belongsTo(models.Course, {
                    as: 'entity',
                    foreignKey: 'entity_id'
                });
            }
        }
    }
);

module.exports = Favorite;
