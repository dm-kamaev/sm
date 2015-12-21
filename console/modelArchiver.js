var MultiGeocoder = require('multi-geocoder');
var commander = require('commander');
var colors = require('colors');

var ModelArchiver = require('./modules/modelArchiver/ModelArchiver');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var path = require('path');

var start = async(() => {
    var fullPath =  path.join(__dirname, '../api/modules/school/migrations');
    var ma = new ModelArchiver(models.University, fullPath);
    ma.save();
   // ma.load();
});


commander
     .command('modelArchiver')
     .description('gets cords from yandex api')
     .action(() => start());
exports.Command;
