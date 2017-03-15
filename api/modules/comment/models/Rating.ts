import * as Sequelize from 'sequelize/v3';

import {RatingAttributes, RatingInstance} from '../types/rating';

interface RatingModel
    extends Sequelize.Model<RatingInstance, RatingAttributes> {}

const sequelize = require('sequelize');
const db = require('../../../../app/components/db');

const Model: RatingModel = db.define('Rating', {
    score: {
        type: sequelize.ARRAY(sequelize.INTEGER),
        validate: {
            isRightCount: function(value) {
                if (value.length != 4) {
                    throw new Error('Expected 4 numbers');
                }
            },
            isRightFormat: function(value) {
                for (let i = 0; i < value.length; i++) {
                    if (value[i] < 0 || value[i] > 5) {
                        throw new Error('Every number must be from 0 to 5');
                    }
                }
            }
        }
    },
    totalScore: {
        type: sequelize.FLOAT,
        field: 'total_score'
    }
}, {
    underscored: true,
    tableName: 'rating',
    classMethods: {
        associate: function(models) {
            this.hasOne(models.Comment, {
                foreignKey: 'rating_id',
                as: 'comment'
            });
            this.hasOne(models.ProgramComment, {
                foreignKey: 'rating_id',
                as: 'programComment'
            });
        }
    }
});

export {Model};
