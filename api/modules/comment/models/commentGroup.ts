import * as Sequelize from 'sequelize/v3';
const sequelize = require('../../../../app/components/db');

import {
    CommentGroupAttributes, CommentGroupInstance
} from '../types/commentGroup';

interface CommentGroupModel
    extends Sequelize.Model<CommentGroupInstance, CommentGroupAttributes> {}

const Model: CommentGroupModel = sequelize.define('CommentGroup', {}, {
    underscored: true,
    tableName: 'comment_group',
    classMethods: {
        associate: function(models) {
            this.hasMany(models.Comment, {
                as: 'comments', foreignKey: 'comment_group_id'
            });
            this.hasMany(models.ProgramComment, {
                as: 'programComments',
                foreignKey: 'comment_group_id'
            });
        }
    }
});

export {Model};
