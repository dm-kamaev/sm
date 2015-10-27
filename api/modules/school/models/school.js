var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var School = db.define('School', {
    name: DataType.STRING,
    director: DataType.STRING,
    phones: DataType.ARRAY(DataType.STRING),
    site: DataType.STRING,
    addresses: DataType.ARRAY(DataType.STRING),
    metro: DataType.ARRAY(DataType.STRING),
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
