var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var School = db.define('School', {
    name: DataType.STRING,
    director: DataType.STRING,
    phones: DataType.ARRAY(DataType.STRING),
    site: DataType.STRING,
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
            School.hasMany(models.Address, {
                as: 'addresses', foreignKey: 'school_id'
            });
            School.belongsTo(models.CommentGroup, {
                foreignKey: 'comment_group_id'
            });
        }
    }
});

module.exports = School;
