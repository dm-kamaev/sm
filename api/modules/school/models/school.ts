const DataType = require('sequelize'),
    db = require('../../../../app/components/db'),
    urlService = require('../../entity/services/urls');
const schoolType = require('../enums/schoolType');

import * as Sequelize from 'sequelize/v3';

export interface SchoolAttribute {
    id?: number;
    name?: string;
    abbreviation?: string;
    fullName?: string;
    schoolType?: string;
    director?: string;
    phones?: Array<string>;
    site?: string;
    govermentKey?: number;
    cityId?: number;
    educationInterval?: Array<number>;
    features?: Array<string>;
    extendedDayCost?: string;
    dressCode?: boolean;
    links?: Array<[string, string]>;
    description?: string;
    boarding?: boolean;
    popularity?: number;
    score?: Array<number>;
    totalScore?: number;
    rank?: number;
    rankDogm?: number;
    scoreCount?: Array<number>;
    reviewCount?: number;
    commentGroupId?: number;
}

export interface SchoolInstance
    extends Sequelize.Instance<SchoolAttribute>, SchoolAttribute {}

interface SchoolModel
    extends Sequelize.Model<SchoolInstance, SchoolAttribute> {}

const Model: SchoolModel = db.define('School', {
    id: {
        field: 'id',
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    /**
     * School info
     */
    name: {
        type: DataType.STRING,
        unique: true
    },
    abbreviation: DataType.STRING,
    fullName: {
        field: 'full_name',
        type: DataType.STRING
    },
    schoolType: {
        field: 'school_type',
        type: DataType.ENUM,
        values: schoolType.toArray(),
        allowNull: false

    },
    director: DataType.STRING,
    phones: DataType.ARRAY(DataType.STRING),
    site: DataType.STRING,
    govermentKey: {
        field: 'goverment_key',
        type: DataType.INTEGER
    },
    cityId: {
        field: 'city_id',
        type: DataType.INTEGER,
    },
    educationInterval: {
        field: 'education_interval',
        type: DataType.ARRAY(DataType.INTEGER)
    },
    features: {
        field: 'features',
        type: DataType.ARRAY(DataType.STRING)
    },
    extendedDayCost: {
        field: 'extended_day_cost',
        type: DataType.STRING
    },
    dressCode: {
        field: 'dress_code',
        type: DataType.BOOLEAN
    },
    links: {
        field: 'links',
        type: DataType.ARRAY(DataType.ARRAY(DataType.STRING))
    },
    description: {
        field: 'description',
        type: DataType.STRING
    },
    boarding: {
        field: 'boarding',
        type: DataType.BOOLEAN
    },
    popularity: {
        field: 'popularity',
        type: DataType.INTEGER
    },

    /**
     * Scores, ratings, etc
     */
    score: {
        type: DataType.ARRAY(DataType.FLOAT),
    },
    totalScore: {
        type: DataType.FLOAT,
        field: 'total_score',
        notNull: false,
        defaultValue: 0
    },
    rank: {
        type: DataType.INTEGER,
    },
    rankDogm: {
        type: DataType.INTEGER,
        field: 'rank_dogm'
    },
    scoreCount: {
        type: DataType.ARRAY(DataType.INTEGER),
        field: 'score_count'
    },
    reviewCount: {
        type: DataType.INTEGER,
        field: 'review_count'
    },

    /**
     * Meta
     */
    commentGroupId: {
        type: DataType.INTEGER,
        field: 'comment_group_id'
    }
}, {
    underscored: true,
    tableName: 'school',
    hooks: {
        afterCreate: urlService.generateSchoolAlias,
        afterUpdate: urlService.generateSchoolAlias,
    },

    classMethods: {
        associate: function(models) {
            this.hasMany(models.GiaResult, {
                as: 'giaResults', foreignKey: 'school_id',
                onDelete: 'cascade'
            });
            this.hasMany(models.OlimpResult, {
                as: 'olimpResults', foreignKey: 'school_id',
                onDelete: 'cascade'
            });
            this.hasMany(models.EgeResult, {
                as: 'egeResults', foreignKey: 'school_id',
                onDelete: 'cascade'
            });
            this.hasMany(models.SchoolSearchData, {
                as: 'schoolSearchData', foreignKey: 'school_id',
                onDelete: 'cascade'
            });
            this.hasMany(models.Address, {
                as: 'addresses',
                foreignKey: 'entity_id',
            });
            this.belongsTo(models.CommentGroup, {
                foreignKey: 'comment_group_id',
                as: 'commentGroup'
            });
            this.belongsTo(models.City, {
                foreignKey: 'city_id',
                as: 'city'
            });
            this.hasMany(models.SchoolUniversity, {
                as: 'schoolUniversities', foreignKey: 'school_id'
            });
            this.hasMany(models.Activity, {
                as: 'activites',
                foreignKey: 'school_id'
            });
            this.hasMany(models.AdditionalEducation, {
                as: 'additionalEducations',
                foreignKey: 'school_id'
            });
            this.hasMany(models.Favorite, {
                as: 'favorite',
                foreignKey: 'entity_id',
                onDelete: 'cascade'
            });
            this.hasMany(models.SchoolSpecializedClass, {
                as: 'specializedClasses',
                foreignKey: 'school_id'
            });
        }
    }
});

export {Model};
