'use strict';
const path = require('path');
const await = require('asyncawait/await');
const async = require('asyncawait/async');

var sequelize = require.main.require('../../../app/components/db');
var squel = require('squel');
const ModelArchiver = require(
    '../../console/modules/modelArchiver/ModelArchiver.js');
const School = require('../../api/modules/school/models/school');

module.exports = {
    up: async(function() {
        var dir = path.join(__dirname, '../../api/modules/school/migrations'),
            file = '20160219141720-rank-dogm-fix.tar.gz',
            archiver = new ModelArchiver(School, dir, null, file);

        archiver.load();

        var sqlUpdate = squel.update()
            .table('school')
            .set('rank_dogm', 10)
            .where('id = ?', 588)
            .toString() + '; ';
        sqlUpdate += squel.update()
            .table('school')
            .set('rank_dogm', 21)
            .where('id = ?', 249)
            .toString() + '; ';
        sqlUpdate += squel.update()
            .table('school')
            .set('rank_dogm', 23)
            .where('id = ?', 656)
            .toString();
        await(sequelize.query(
            sqlUpdate,
            {
                type: sequelize.QueryTypes.UPDATE
            }
        ));
    }),
    down: function() {
        return null;
    }
};
