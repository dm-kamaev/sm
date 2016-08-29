'use strict';
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var commander = require('commander');

var sequelize = require('../app/components/db');
var squel = require('squel').useFlavour('postgres');
var services = require('../app/components/services').all;
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
    var sqlRes = await(sequelize.query(generateFindSql(rank.site)));
    var id = rank.id || sqlRes[0][0].id;

    if (sqlRes[0].length == 1 || id) {
        sequelize.query(generateUpdateSql(id, rank.rankDogm));
    } else {
        console.log(colors.red(rank.name) + ' | ' + colors.red(rank.site));
        notFound = true;
    }

    return notFound;
});

/**
 * @param {string} site
 * @return {string}
 */
var generateFindSql = function(site) {
    site = '%' + site + '%';
    return squel.select()
        .from('school')
        .field('id')
        .field('site')
        .field('links[1][2]')
        .where(
            'links[1][2] ilike ? or site ilike ? or links[2][2] ilike ?',
            site,
            site,
            site)
        .toString();
};

/**
 * @param {number} schoolId
 * @param {number} rankDogm
 */
var generateUpdateSql = function(schoolId, rankDogm) {
    return squel.update()
        .table('school')
        .set('rank_dogm', rankDogm)
        .where('id = ?', schoolId)
        .toString();
};

/**
 * Settings for accessing this script using cli
 */
commander
    .command('rating')
    .description('Parses http://dogm.mos.ru/rating/')
    .action(() => parse());

exports.Command;
