var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var School = db.define('School', {
    name: DataType.STRING,
    director: DataType.STRING,
    phones: DataType.ARRAY(DataType.STRING),
    site: DataType.STRING,
    addresses: DataType.ARRAY(DataType.STRING),
    coords: DataType.ARRAY(DataType.ARRAY(DataType.FLOAT)),
    comment_group_id: DataType.INTEGER
}, {
    underscored: true,
    tableName: 'school',
    classMethods: {
        associate: function (models) {
            School.hasMany(models.GiaResults, {
                as: 'gia_results', foreignKey: 'school_id'
            });

            School.belongsTo(models.CommentGroup, { foreignKey: 'comment_group_id'});
        }
    }
});

module.exports = School;
