var db = require('../../../../app/components/db');

var CommentGroup = db.define('CommentGroup', {}, {
    underscored: true,
    tableName: 'comment_group',
    classMethods: {
        associate: function(models) {
            this.hasMany(models.Comment, {
                as: 'comments', foreignKey: 'comment_group_id'
            });
            this.hasMany(models.UniversityComment, {
                as: 'universityComments',
                foreignKey: 'comment_group_id'
            });
        }
    }
});

module.exports = CommentGroup;
