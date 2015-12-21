var commander = require('commander');

var ModelArchiver = require('./modules/modelArchiver/ModelArchiver');
var async = require('asyncawait/async');
var models = require.main.require('./app/components/models').all;
var path = require('path');

var start = async(() => {

    /*set model and path to migration folder*/ 
    var fullPath =  path.join(__dirname, '../api/modules/geo/migrations');
    var ma = new ModelArchiver(models.City, fullPath);
    ma.save();
});


commander
     .command('modelArchiver')
     .description('gets cords from yandex api')
     .action(() => start());
exports.Command;
