'use strict';
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var commander = require('commander');

var sequelize = require.main.require('./app/components/db');
var services = require.main.require('./app/components/services').all;
var colors = require('colors');
const RatingParser = require('./modules/parse/dogm.mos.ru/RatingParser.js');

var parse = async(function() {
    sequelize.options.logging = false;
    var notFoundCount = 0;
    var firstPageParser 
       = await(new RatingParser('http://dogm.mos.ru/rating/'));
    var secondPageParser
       = await(new RatingParser('http://dogm.mos.ru/napdeyat/obdet/ranking-301-to-500.php'));
    var results = firstPageParser.results.concat(secondPageParser.results);
    await(results.forEach(res => {
        var isNotFound = await(processRank(res));
        if (isNotFound)
            notFoundCount++;
    }));
    var color = notFoundCount ? colors.yellow : colors.green;
    var processed = results.length - notFoundCount;
    console.log('Processed: ' + color(processed + '/' + results.length));
   
});

/**
 * @param {object} rank
 * @return {bool} isNotFound 
 */
var processRank = async(function(rank) {
    var notFound = false;
    var school = await(services.school.findBySite(rank.site));
    if (!school) { 
        //console.log('Can\'t find school ' + colors.red(rank.name) + ' site ' + colors.red(rank.site));
        console.log(colors.red(rank.name) + ' | ' + colors.red(rank.site));
        notFound = true;
    } else {
        services.school.setRank(school, rank.rank);
    }
    return notFound;
});


/**
 * Settings for accessing this script using cli
 */
commander
    .command('rating')
    .description('Parses http://dogm.mos.ru/rating/')
    .action(() => parse());

exports.Command;

