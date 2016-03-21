'use strict';

const path = require('path');
const await = require('asyncawait/await');
const async = require('asyncawait/async');
const sequelize = require('../../app/components/db');

const ModelArchiver = require('../../console/modules/modelArchiver/ModelArchiver.js');
const SqlHelper = require('../../console/modules/sqlHelper/SqlHelper.js');

const folder = path.join(__dirname, '../../api/modules/comment/migrations');
const pathToData = path.join(folder, '20160318193800-update-comments.json');
const data = require(pathToData).data;

module.exports = {
    up: async(function () {
        resetData();

        data.forEach(item => {
            var file = item.fileName;
            var model = require(item.pathToModel);
            var archiver = new ModelArchiver(model, folder, null, file);

            console.log('-', model);

            archiver.load();
        });
    }),
    down: function () {
        return null;
    }
};

var resetData = function() {
    var resetColumns = 'UPDATE school \
        SET score=NULL, \
        comment_group_id=NULL, \
        total_score=0, \
        score_count=NULL, \
        review_count=NULL \
        WHERE comment_group_id <> 0;';
    await(SqlHelper.resetTable('comment'));
    await(SqlHelper.resetTable('rating'));
    await(sequelize.query(
        resetColumns,
        {
            type: sequelize.QueryTypes.UPDATE
        }
    ));
    await(SqlHelper.resetTable('comment_group'));
    await(SqlHelper.resetTable('user_data'));
}
