'use strict';

const path = require('path');
const await = require('asyncawait/await');
const async = require('asyncawait/async');
const sequelize = require('../../app/components/db');

const CommentPublicationDateManipulator = require(
    '../../console/modules/comments/CommentPublicationDateManipulator');

const folder = path.join(__dirname, '../../api/modules/comment/migrations');
const pathToData = path.join(folder, '20160520215940-add-publication-date.json');
const data = require(pathToData).data;

module.exports = {
    up: async(function () {
        var commentPublicationDateManipulator =
            new CommentPublicationDateManipulator();
        sequelize.options.logging = false;
        data.forEach(item => {
            var file = item,
                filePath = path.join(folder, file);
            await(commentPublicationDateManipulator.updateDates(filePath));
        });
    }),
    down: function () {
        return null;
    }
};
