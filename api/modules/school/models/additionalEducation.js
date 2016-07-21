var DataType = require('sequelize'),
    db = require('../../../../app/components/db');

var AdditionalEducation = db.define('AdditionalEducation', {
    sphereId: {
        type: DataType.INTEGER,
        field: 'sphere_id'
    },
    schoolId: {
        type: DataType.INTEGER,
        field: 'school_id'
    },
    category: DataType.STRING,
    name: DataType.STRING,
    description: DataType.TEXT,
    phone: DataType.STRING,
    contact: DataType.STRING,
    requirements: DataType.TEXT,
    rawData: {
        type: DataType.TEXT,
        field: 'raw_data'
    }
}, {
    underscored: true,
    tableName: 'additional_education',

    classMethods: {
        associate: function(models) {
            AdditionalEducation.belongsTo(
                models.School,
                {
                    foreignKey: 'school_id'
                }
            );
            AdditionalEducation.belongsTo(
                models.AdditionalEducationSphere,
                {
                    foreignKey: 'sphere_id',
                    as: 'sphere'
                }
            );
        }
    }
});

module.exports = AdditionalEducation;
