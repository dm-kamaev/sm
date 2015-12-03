var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var University = db.define('University', {
	id: {
		type: DataType.INTEGER,
		field: 'id',
		unique: true,
        allowNull: false,
		primaryKey: true
	},
    name: DataType.STRING,
}, {
    underscored: true,
    tableName: 'university',
	classMethods: {
        associate: function (models) {
            University.hasOne(models.SchoolUniversity, {
                foreignKey: 'university_id'
            });
        }
    }
});

module.exports = University;
