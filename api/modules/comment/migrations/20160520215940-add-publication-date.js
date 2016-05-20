'use strict';

const path = require('path');
const await = require('asyncawait/await');
const async = require('asyncawait/async');

const ModelArchiver = require(
    '../../console/modules/modelArchiver/ModelArchiver.js');

const folder = path.join(__dirname, '../../api/modules/comment/migrations');
const pathToData = path.join(folder, '20160520215940-add-publication-date.json');
const data = require(pathToData).data;

const Comment = require('../../api/modules/comment/models/comment');

module.exports = {
    up: async(function () {
        data.forEach(item => {
            var file = item,
                dir = path.join(__dirname, '../../api/modules/comment/migrations'),
                archiver = new ModelArchiver(Comment, dir, null, file);


            await(archiver.load());
        });
    }),
    down: function () {
        return null;
    }
};
