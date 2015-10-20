var DataType = require('sequelize'),
    db = require.main.require('./app/components/db'),
    commentGroup = require.main.require('./app/modules/commentGroup/models');

var schl = db.define('School', {
        name: DataType.STRING,
        director: DataType.STRING,
        phones: DataType.ARRAY(DataType.STRING),
        site: DataType.STRING,
        addresses: DataType.ARRAY(DataType.STRING),
        comment_group_id : DataType.INTEGER,
        coords: DataType.ARRAY(DataType.ARRAY(DataType.FLOAT))

    }, {underscored: true, tableName: 'school'})
    var cg = commentGroup.comment_group;
    schl.belongsTo(cg, { foreignKey: 'comment_group_id'});
    schl.sync();
module.exports = schl;
