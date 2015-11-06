var colors = require('colors');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;

exports.getAll = async(() => {
    return await(models.Address.findAll());
});

exports.updateCoords = async((addresInst, coordsArr) => {
    for (var i=0; i< addresInst.length; i++){
        addresInst[i].update({coords:coordsArr[i]});
    }
});
