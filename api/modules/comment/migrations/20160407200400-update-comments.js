'use strict';

const path = require('path');
const await = require('asyncawait/await');
const async = require('asyncawait/async');
const sequelize = require('../../app/components/db');

const folder = path.join(__dirname, '../../api/modules/comment/migrations');
const pathToData = path.join(folder, '20160407200400-update-comments.json');
const data = require(pathToData).data;

// var school = require('../../api/modules/school');
// const models = require('../../app/components/models');

const PollComments = require('../../console/modules/comments/PollComments');

module.exports = {
    up: async(function() {
        sequelize.options.logging = false;
        var pollComments = new PollComments();
        data.forEach(item => {
            await(pollComments.fillDb(
                pollComments.unzipComments(path.join(folder, item))
            ));
        });
    }),
    down: function() {
        return null;
    }
};
