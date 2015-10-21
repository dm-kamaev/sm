var DataType = require('sequelize'),
    db = require.main.require('./app/components/db'),
    CommentGroup = require.main.require('./app/modules/commentGroup/models');

var comment = db.define('Comment', {
        text: DataType.TEXT,
        usetType: DataType.ENUM('Parent','Graduate','Scholar'),
        score: DataType.ARRAY(DataType.INTEGER)
    }, {underscored: true, tableName: 'comment'})
    var cg = CommentGroup.comment_group;
    comment.belongsTo(cg, { foreignKey: 'comment_group_id'});
    comment.sync();
module.exports = comment;
