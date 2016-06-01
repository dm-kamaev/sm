var DataType = require('sequelize'),
    db = require('../../../../app/components/db');

var Favorites = db.define(
    'Favorites',
    {
        id: {
            type: DataType.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataType.INTEGER,
            field: 'user_id'
        },
        schoolId: {
            type: DataType.INTEGER,
            field: 'school_id'
        }
    },
    {
        underscored: true,
        tableName: 'favorites',
        classMethods: {
            associate: function(models) {
                Favorites.belongsTo(models.school, {
                    as: 'school',
                    foreignKey: 'school_id'
                });
            }
        }
    }
);
