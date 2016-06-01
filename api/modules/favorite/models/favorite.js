var DataType = require('sequelize'),
    db = require('../../../../app/components/db');

var Favorite = db.define(
    'Favorite',
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
                Favorite.belongsTo(models.school, {
                    as: 'school',
                    foreignKey: 'school_id'
                });
            }
        }
    }
);
