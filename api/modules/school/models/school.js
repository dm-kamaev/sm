var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var School = db.define('School', {
    name:DataType.STRING,
    type: DataType.ENUM('Школа', 'Лицей', 'Гимназия', 'Центр образования', 'Коррекционная школа', 'Коррекционная школа-интернат', 'Кадетская школа', 'Кадетская школа-интернат'),
    director: DataType.STRING,
    phones: DataType.ARRAY(DataType.STRING),
    site: DataType.STRING,
    addresses: DataType.ARRAY(DataType.STRING),
    coords: DataType.ARRAY(DataType.ARRAY(DataType.FLOAT))
}, {
    underscored: true,
    tableName: 'school',
    classMethods: {
        associate: function (models) {
            School.belongsTo(models.CommentGroup, { foreignKey: 'comment_group_id'});
        }
    }
});

module.exports = School;
