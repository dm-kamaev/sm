var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');
    console.log("ASGGSDDFH");

    var cGroup = db.define('comment_group', { },
     {
         underscored: true,
         tableName:'comment_group'
     })
     cGroup.sync();
    module.exports = cGroup;
