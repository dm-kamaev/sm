'use strict';
const path = require('path');
const await = require('asyncawait/await');
const async = require('asyncawait/async');

const ModelArchiver = require(
    '../../console/modules/modelArchiver/ModelArchiver.js');
const Comment = require('../../api/modules/comment/models/comment');

module.exports = {
    up: async(function () {
        var dir = path.join(__dirname, '../../api/modules/comment/migrations'),
            file = '20160524122757-fix-text-bad-symbols.tar.gz',
            archiver = new ModelArchiver(Comment, dir, null, file);

        await(archiver.load());
    }),
    down: function () {
        return null;
    }
};
