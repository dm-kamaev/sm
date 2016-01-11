var async = require('asyncawait/async');
var await = require('asyncawait/await');
var commander = require('commander');
var xlsx = require('node-xlsx');
var fs = require('fs');
var mkdirp = require("mkdirp");

var services = require.main.require('./app/components/services').all;

const REPORT_PATH = './console/reports/';

var FULL_NAME_INDEX = 0,
    NAME_INDEX = 1,
    SITE_INDEX = 2,
    SOCIAL_INDEX = 3,
    SPECIALIZED_INDEX = 5,
    DESCRIPTION_INDEX = 6,
    FEATURES_INDEX = 7,
    EXT_DAY_COST_INDEX = 8,
    DRESS_CODE_INDEX = 9,
    SCHOOL_TYPE_INDEX = 10,
    BOARDING_INDEX = 11,
    DIRECTOR_INDEX = 17,

    AREA_INDEX = 13,
    ADDRESS_INDEX = 14,
    PHONE_INDEX = 16;
    // add educational_programms (db - stages)

/**
 * main parse method
 * @param {string} path
 */
var parse = async(function(path) {
    var rows = xlsx.parse(path)[0]['data'],
        schools = await(services.school.listInstances()),

        parsedData = parseData(rows),
        parsedSchools = parseSchools(schools);

    var matches = findMatches(parsedSchools, parsedData);

    var specializedStat = [];

    console.log(matches.length);

    matches.forEach(match => {
        var data = match[1];
        var schoolData = {
            links: data.site,
            description: data.description,
            features: data.features,
            extendedDayCost: data.extDayCost,
            dressCode: data.dressCode,
            boarding: data.boarding,
            specializedClasses: data.specialized,
        };

        if (data.schoolType) {
            schoolData.schoolType = data.schoolType;
        }
        if (data.director) {
            schoolData.director = data.director;
        }

        services.school.update(match[0], schoolData);

        if (schoolData.specializedClasses) {
            specializedStat.push(
                schoolData.specializedClasses
            );
        }
    });
    mkdirp(REPORT_PATH, function(err) {
        if (err) {
            return;
        }
    });
    fs.writeFileSync(
        REPORT_PATH + 'specializedClasses.json',
        JSON.stringify(specializedStat)
    );
});

var parseData = function(data) {
    var parsed = [],
        row = {
            site: []
        };

    for (var i = 1, l = data.length; i < l; i++) {
        if (typeof data[i][FULL_NAME_INDEX] !== 'undefined') {

            // Update data

            if (i !== 1) {
                parsed.push(row);
                row = {
                    site: []
                };
            }

            row.fullName = data[i][FULL_NAME_INDEX];

            row.name = data[i][NAME_INDEX] || '';

            if (data[i][SITE_INDEX]) {
                row.site.push(parseSite(data[i][SITE_INDEX]));
            }

            if (data[i][SOCIAL_INDEX]) {
                row.site.push(parseSocial(data[i][SOCIAL_INDEX]));
            }

            if (data[i][SPECIALIZED_INDEX]) {
                row.specialized = parseSpecialized(data[i][SPECIALIZED_INDEX]);
            }

            row.description = data[i][DESCRIPTION_INDEX] || '';

            if (data[i][FEATURES_INDEX]) {
                row.features = parseFeatures(data[i][FEATURES_INDEX]);
            }

            row.extDayCost = data[i][EXT_DAY_COST_INDEX] || '';

            row.dressCode = stringToBool(data[i][DRESS_CODE_INDEX]);

            row.schoolType = capitalizeFirstChar(
                data[i][SCHOOL_TYPE_INDEX]
            ) || '';

            row.boarding = stringToBool(data[i][BOARDING_INDEX]);

            row.director = data[i][DIRECTOR_INDEX] || '';

            // Create data

            row.areas = parseAddressOrArea(data[i][AREA_INDEX]);

            row.addresses = parseAddressOrArea(data[i][ADDRESS_INDEX]);

            row.phone = data[i][PHONE_INDEX] || '';

        } else if (typeof data[i][SITE_INDEX] !== 'undefined') {

            row.site.push(parseSite(data[i][SITE_INDEX]));

        } else if (typeof data[i][SOCIAL_INDEX] !== 'undefined') {

            row.site.push(parseSocial(data[i][SOCIAL_INDEX]));
        }
    }
    parsed.push(row);

    return parsed;
};

var parseSchools = function(schools) {
    var parsedSchools = [];
    for (var i = 0, schoolsLength = schools.length; i < schoolsLength; i++) {
        var domains = [];
        if (schools[i].links) {
            schools[i].links.forEach(link => {
                var domain = extractDomain(link[1]);
                if (!(domain.indexOf('vk') > -1) &&
                    !(domain.indexOf('facebook') > -1))
                    {
                        domains.push(extractDomain(link[1]));
                    }
            });
        }
        if (schools[i].site) {
            domains.push(extractDomain(schools[i].site));
        }
        parsedSchools.push({
            'domains': domains,
            'id': schools[i].id,
        });
    }
    return parsedSchools;
};

var findMatches = function(schools, data) {
    var matches = [],
        dataLength = data.length,
        schoolsLength = schools.length;
    for (var i = 0; i < dataLength; i++) {
        var flag = false;
        data[i].site.forEach(row => {
            domain = extractDomain(row[1]);
            schoolLoop:
            for (var j = 0; j < schoolsLength; j++) {
                for (var k = 0, domainLength = schools[j].domains.length;
                    k < domainLength; k++) {

                    if (domain && schools[j].domains[k] === domain) {
                        flag = true;

                        matches.push([schools[j].id, data[i]]);
                        break schoolLoop;
                    }
                }
            }
        });

        if (!flag && data[i].areas) {
            await(createSchool(data[i]));
        }
    }
    return matches;
};

var createSchool = async(function(data) {
    var school = await(services.school.create({
        fullName: data.fullName,
        name: data.name,
        links: data.site,
        description: data.description,
        specializedClasses: data.specialized,
        features: data.features,
        extendedDayCost: data.extDayCost,
        dressCode: data.dressCode,
        boarding: data.boarding,
        schoolType: data.schoolType,
        director: data.director,
        phones: [data.phone],
        educationInterval: [1,2,3,4,5,6,7,8,9,10,11] // TODO: need data
    }));

    await(services.school.setAddresses(
        school,
        data.addresses
        .map(address => {
            return {
                name: address
            }
        })
    ));

    for (var i = 0, l = data.areas.length; i < l; i++) {
        var area = await(services.area.create({
            name: data.areas[i]
        }));
        await(services.address.setArea(area[0].name, data.addresses[i]));
    };
});

var parseSite = function(site) {
    var parsed = [],
        url = site.replace(/(\r\n|\n|\r)/g,"");
    if (url.indexOf('mskobr') > -1) {
        parsed = [
            'Школа на сайте Департамента образования Москвы',
            url
        ]
    }
    else {
        parsed = [
            'Сайт школы',
            url
        ];
    }
    return parsed;
};

var parseSocial = function(social) {
    var parsed = [],
        social = social,
        split = social.lastIndexOf('-'),
        splitted = [
            social.slice(0, split),
            social.slice(split + 1)
        ];
    parsed = [
        social.slice(split + 1).trim(),
        social.slice(0, split).trim()
    ];
    return parsed;
};

var parseSpecialized = function(specialized) {
    specialized = specialized.split('\n');
    var result = [];
    for (var i = 0, l = specialized.length; i < l; i += 2) {
        result.push([
            specialized[i + 1],
            specialized[i].split(';').map(item => {
                return capitalizeFirstChar(item.trim());
            })
        ]);
    }
    return formatSpecialized(result);
};

var formatSpecialized = function(specialized) {
    return specialized.map(set => {
        return set[1].map(aClass => {
            return [set[0], aClass];
        });
    })
    .reduce((prev, curr) => {
        return prev.concat(curr);
    }, []);
};

var parseFeatures = function(features) {
    var splitted = features.split(';');

    for (var i = 0; i < splitted.length; i++) {
        splitted[i] = splitted[i].trim();
        if (splitted[i] == '') {
          splitted.splice(i, 1);
          i--;
        }
    }

    return splitted.map(item => {
        return capitalizeFirstChar(item);
    });
};

var stringToBool = function(string) {
    if (string) {
        return string.trim() !== 'нет';
    } else {
        return false;
    }
};

var capitalizeFirstChar = function(string) {
    if (string)
    {
        string = string.trim();
        return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
        return '';
    }
};

var parseAddressOrArea = function(addresses) {
    if (addresses) {
        return addresses.split(';').map(adr => {
            return adr
                .replace(/(\r\n|\n|\r)/g,"")
                .replace('район',"")
                .trim();
        });
   }
};

var extractDomain = function(url) {
    var domain;

    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    domain = domain.split(':')[0];

    return domain;
};

/**
 * Settings for accessing this script using cli
 */
commander
    .command('parseExt <path>')
    .description('Parses an .xlsx file from a given path')
    .action(file => parse(file));

exports.Command;
