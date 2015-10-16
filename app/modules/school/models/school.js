var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');


module.exports = db.define('School', {
    name: DataType.STRING,
    director: DataType.STRING,
    phones: DataType.ARRAY(DataType.STRING),
    site: DataType.STRING,
    addresses: DataType.ARRAY(DataType.STRING),
    coords: DataType.ARRAY(DataType.ARRAY(DataType.FLOAT))
});
