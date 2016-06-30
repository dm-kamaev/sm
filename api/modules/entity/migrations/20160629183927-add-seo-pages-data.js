'use strict';


const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    path = require('path');

const SeoPageOperator =
    require('../../console/modules/seoPageTools/SeoPageOperator.js');


module.exports = {
    up: async(function() {
        var seoPageOperator = new SeoPageOperator(),
            dir = path.join(
                __dirname,
                '../../api/modules/entity/migrations'
            ),
            fileName = '20160629183927-add-seo-pages-data.tar.gz',
            filePath = path.join(dir, fileName);

        await(seoPageOperator.createDbSeoPagesFromArchive(filePath));
    }),
    down: async(function() {
        return null;
    })
};
