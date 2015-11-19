var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var School = db.define('School', {
    name:DataType.STRING,
    fullName: {
        field: 'full_name',
        type: DataType.STRING
    },
    schoolType: {
        field: 'school_type',
        type: DataType.ENUM,
        values: ['Школа', 'Лицей', 'Гимназия', 'Центр образования', 'Коррекционная школа', 'Коррекционная школа-интернат', 'Кадетская школа-интернат', 'Кадетская школа'],
        allowNull: false
    },
    director: DataType.STRING,
    phones: DataType.ARRAY(DataType.STRING),
    site: DataType.STRING,
    educationInterval: {
        field: 'education_interval',
        type: DataType.ARRAY(DataType.INTEGER)
    },
    comment_group_id: DataType.INTEGER,
    goverment_key: {
        type: DataType.INTEGER,
        unique: true,
        allowNull: false
    }
}, {
    underscored: true,
    tableName: 'school',

    classMethods: {
        associate: function (models) {
            School.hasMany(models.GiaResult, {
                as: 'giaResult', foreignKey: 'school_id'
            });
            School.hasMany(models.Address, {
                as: 'addresses',
                foreignKey: 'school_id'
            });
            School.belongsTo(models.CommentGroup, {
                foreignKey: 'comment_group_id'
            });
            School.hasMany(models.Rating, {
                as: 'ratings',
                foreignKey: 'school_id'
            });
        }
    }
});

module.exports = School;
