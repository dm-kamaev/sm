'use strict';

const async = require('asyncawait/async'),
    squel = require('squel');

const sequelize = require('../../app/components/db'),
    departmentStage = require('../../api/modules/geo/enums/departmentStage');

module.exports = {
    up: async(function() {
        var sqlQuery = squel.delete()
            .from('department')
            .where('id in (4810, 4811)')
            .toString() + '; ';

        sqlQuery += squel.update()
            .table('department')
            .set('name', 'СП №330')
            .set('stage', departmentStage.HIGH)
            .where('id = 4833')
            .toString() + '; ';

        sqlQuery += squel.update()
            .table('department')
            .set('name', 'СП №613')
            .set('stage', departmentStage.MIDDLE)
            .where('id = 4821')
            .toString() + '; ';

        sqlQuery += squel.update()
            .table('department')
            .set('name', 'СП №613')
            .where('id = 4820')
            .toString() + '; ';

        sqlQuery += squel.update()
            .table('department')
            .set('name', 'СП №661')
            .set('stage', departmentStage.MIDDLE)
            .where('id = 4815')
            .toString() + '; ';

        sqlQuery += squel.update()
            .table('department')
            .set('name', 'СП №661')
            .where('id = 4814')
            .toString() + '; ';

        sqlQuery += squel.update()
            .table('department')
            .set('name', 'СП №1225')
            .set('stage', departmentStage.MIDDLE)
            .where('id = 4829')
            .toString() + '; ';

        sqlQuery += squel.update()
            .table('department')
            .set('name', 'СП №1225')
            .where('id = 4828')
            .toString() + '; ';

        sqlQuery += squel.delete()
            .from('department')
            .where('id = 4817')
            .toString() + '; ';

        sqlQuery += squel.update()
            .table('department')
            .set('name', 'СП №1227')
            .where('id = 4818')
            .toString() + '; ';

        sqlQuery += squel.update()
            .table('department')
            .set('name', 'СП №1227')
            .where('id in (4826, 4827)')
            .toString() + '; ';

        sqlQuery += squel.update()
            .table('department')
            .set('name', 'СП №1397')
            .set('stage', departmentStage.MIDDLE)
            .where('id = 4825')
            .toString() + '; ';

        sqlQuery += squel.update()
            .table('department')
            .set('name', 'СП №1397')
            .where('id = 4824')
            .toString() + '; ';

        sqlQuery += squel.delete()
            .from('address')
            .where('id = 4498')
            .toString() + '; ';

        return sequelize.query(sqlQuery);
    }),
    down: async(function(queryInterface) {
        return null;
    })
};
