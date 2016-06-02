var DataType = require('sequelize'),
    db = require('../../../../app/components/db');

var Favorite = db.define(
    'Favorite',
    {
        userId: {
            type: DataType.INTEGER,
            field: 'user_id'
        },
        itemId: {
            type: DataType.INTEGER,
            field: 'item_id'
        }
    },
    {
        underscored: true,
        tableName: 'favorite',
        classMethods: {
            associate: function(models) {
                Favorite.belongsTo(models.School, {
                    as: 'item',
                    foreignKey: 'item_id'
                });
            }
        }
    }
);

module.exports = Favorite;
