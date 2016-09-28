const Sequelize = require('sequelize');

const db = require('../../../../app/components/db'),
    entityType = require('../../entity/enums/entityType');

var Favorite = db.define(
    'Favorite',
    {
        userId: {
            type: Sequelize.INTEGER,
            field: 'user_id'
        },
        entityId: {
            type: Sequelize.INTEGER,
            field: 'entity_id'
        },
        entityType: {
            field: 'entity_type',
            type: Sequelize.STRING,
            validate: {
                isIn: [entityType.toArray()]
            }
        },
        createdAt: {
            type: Sequelize.DATE,
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
