var async = require('asyncawait/async');
var await = require('asyncawait/await');
var commander = require('commander');
var xlsx = require('node-xlsx');
var fs = require('fs');
var mkdirp = require('mkdirp');

var sequelize = require.main.require('./app/components/db');
var departmentStage = require('../api/modules/geo/enums/departmentStage');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var Format = require('./modules/utils/format');

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
    DEPARTMENT_INDEX = 15,
    PHONE_INDEX = 16;

/**
 * main parse method
 * @param {string} path
 */
var parse = async(function(path) {
    sequelize.options.logging = false;

    var rows = xlsx.parse(path)[0]['data'],
        schools = await(services.school.listInstances()),
        parsedData = parseData(rows),
        parsedSchools = parseSchools(schools);


    var matches = findMatches(parsedSchools, parsedData);

    var specializedStat = [];

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
            phones: data.phones
        };

        if (data.schoolType) {
            schoolData.schoolType = data.schoolType;
        }
        if (data.director) {
            schoolData.director = data.director;
        }

        var schoolInstance =
            await(services.school.update(match[0], schoolData));

        if (data.departments) {
            var newDepsAdrs = deleteMissingDepartments(
                data.addresses,
                data.departments
            );
            data.addresses = newDepsAdrs.addresses;
            data.departments = newDepsAdrs.departments;
            if (!isAddressesUpdated(data.addresses, match[2])) {
                match[2].forEach(address => {
                    await(models.Address.destroy({
                        where: {
                            name: address.name
                        }}));
                });

                await(services.school.setAddresses(
                    schoolInstance,
                    data.addresses
                    .map(address => {
                        return {
                            name: address
                        };
                    })
                ));

                await(setAddresses(data.areas, data.addresses));

                if (data.departments.length === data.addresses.length) {
                    await(createDepartments(
                        match[0],
                        data.addresses,
                        data.departments));
                }
            } else if (data.departments.length === data.addresses.length) {
                await(updateDepartments(
                    match[0],
                    data.addresses,
                    data.departments
                ));
            }
        }

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

var isAddressesUpdated = function(dataAddresses, schoolAddresses) {
    var matches = 0;
    dataAddresses.forEach(dataAddress => {
        schoolAddresses.forEach(schoolAddress => {
            if (dataAddress === schoolAddress.name) {
                matches++;
            }
        });
    });
    if (matches === schoolAddresses.length &&
        matches === dataAddresses.length) {
        return true;
    } else {
        return false;
    }
};

var deleteMissingDepartments = function(addresses, departments) {
    departments.forEach((department, i) => {
        if (department[0] === '-') {
            departments.splice(i, 1);
            addresses.splice(i, 1);
        }
    });
    return {
        addresses: addresses,
        departments: departments
    };
};

var checkAdresses = function(schoolId, addresses) {
    addresses.map(address => {
        return await(models.Address.findAll({
            where: {
                name: address
            }
        }));
    })
        .forEach(sqlResult => {
            sqlResult.forEach(address => {
                if (address['school_id'] != schoolId) {
                    console.log(
                        'WARN: Address already belongs to another school'.yellow
                    );
                    console.log('Address:', address.name);
                    console.log('School id:', schoolId);
                    console.log('Another school id:', address['school_id']);
                }
            });
        });
};

var updateDepartments = function(schoolId, addresses, departments) {
    checkAdresses(schoolId, addresses);

    var parsedDepartments = splitStages(departments);

    parsedDepartments.forEach((department, i) => {
        var addressId = await(services.address.getAddress({
                name: addresses[i],
                schoolId: schoolId
            })).id,
            name = department[1] || '';

        department[0].forEach(stage => {
            var departmentInstances = await(services.department.getAllByData({
                name: name,
                stage: stage
            }));

            var isFound = false;
            departmentInstances.forEach(dep => {
                if (dep.addressId === addressId) {
                    isFound = true;
                }
            });

            if (!isFound) {
                await(services.department.addDepartment(
                    schoolId,
                    addressId,
                    {
                        name: name,
                        stage: stage
                    }
                ));
            }
        });
    });
};

var createDepartments = function(schoolId, addresses, departments) {
    checkAdresses(schoolId, addresses);

    var parsedDepartments = splitStages(departments);

    parsedDepartments.forEach((department, i) => {
        var addressId = await(services.address.getAddress(
            {
                name: addresses[i],
                schoolId: schoolId
            }
        )).id,
            name = department[1] || '';
        department[0].forEach(stage => {
            await(services.department.addDepartment(
                schoolId,
                addressId,
                {
                    name: name,
                    stage: stage
                }
            ));
        });
    });
};

var splitStages = function(departments) {
    var parsedDepartments = departments.map(department => {
        var stages = [];
        var stage = department[0];
        if (stage.toLowerCase().indexOf('дошкольное') > -1) {
            stages.push(departmentStage.fields.PRESCHOOL);
        }
        if (stage.toLowerCase().indexOf('начальное') > -1) {
            stages.push(departmentStage.fields.ELEMENTARY);
        }
        if (stage.toLowerCase().indexOf('среднее') > -1) {
            stages.push(departmentStage.fields.MIDDLE_HIDE);
        }
        if (stage.toLowerCase().indexOf('дополнительное') > -1) {
            stages.push(departmentStage.fields.SUPPLEMENTARY);
        }
        if (stage.toLowerCase().indexOf('профессиональное') > -1) {
            stages.push(departmentStage.fields.HIGHER_EDUCATION);
        }

        department[0] = stages;
        return department;
    });

    return parsedDepartments;
};

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

            row.schoolType = Format.normalizeStr(data[i][SCHOOL_TYPE_INDEX], {
                capitalize: true,
                collapseSpaces: true
            });

            row.boarding = stringToBool(data[i][BOARDING_INDEX]);

            if (data[i][DEPARTMENT_INDEX]) {
                row.departments = parseDepartments(data[i][DEPARTMENT_INDEX]);
            }

            row.director = data[i][DIRECTOR_INDEX] || '';

            // Create data

            row.areas = parseAddressOrArea(data[i][AREA_INDEX]);

            row.addresses = parseAddressOrArea(data[i][ADDRESS_INDEX]);

            row.phones = parsePhones(data[i][PHONE_INDEX]);
        } else if (typeof data[i][SITE_INDEX] !== 'undefined') {
            row.site.push(parseSite(data[i][SITE_INDEX]));
        } else if (typeof data[i][SOCIAL_INDEX] !== 'undefined') {
            row.site.push(parseSocial(data[i][SOCIAL_INDEX]));
        }
    }
    parsed.push(row);

    return parsed;
};

var parsePhones = function(phonesStr) {
    return phonesStr
        .replace(/\r/g, '')
        .split('\n')
        .filter(str => str)
        .map(phone => Format.phone(phone));
};

var parseSchools = function(schools) {
    var parsedSchools = [];
    for (var i = 0, schoolsLength = schools.length; i < schoolsLength; i++) {
        var domains = [];
        if (schools[i].links) {
            schools[i].links.forEach(link => {
                var domain = extractDomain(link[1]);
                if (!(domain.indexOf('vk') > -1) &&
                    !(domain.indexOf('facebook') > -1)) {
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
            'addresses': schools[i].addresses
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
        schoolLoop: // eslint-disable-line no-labels
        for (
            var siteI = 0, siteL = data[i].site.length;
            siteI < siteL;
            siteI++
        ) {
            var row = data[i].site[siteI];
            var domain = extractDomain(row[1]);

            for (var j = 0; j < schoolsLength; j++) {
                for (var k = 0, domainLength = schools[j].domains.length;
                    k < domainLength; k++) {
                    if (domain && schools[j].domains[k] === domain) {
                        flag = true;

                        matches.push([
                            schools[j].id,
                            data[i],
                            schools[j].addresses
                        ]);

                        break schoolLoop; // eslint-disable-line no-labels
                    }
                }
            }
        }

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
        phones: data.phones,
        educationInterval: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] // TODO:need data
    }));

    var newDepsAdrs = deleteMissingDepartments(
        data.addresses,
        data.departments
    );
    data.addresses = newDepsAdrs.addresses;
    data.departments = newDepsAdrs.departments;

    await(services.school.setAddresses(
        school,
        data.addresses
        .map(address => {
            return {
                name: address
            };
        })
    ));

    setAddresses(data.areas, data.addresses);

    if (data.departments && data.departments.length === data.addresses.length) {
        await(createDepartments(school.id, data.addresses, data.departments));
    }
});

var setAddresses = function(areas, addresses) {
    for (var i = 0, l = areas.length; i < l; i++) {
        var area = await(services.area.create({
            name: areas[i]
        }));
        await(services.address.setArea(area[0].name, addresses[i]));
    };
};

var parseSite = function(site) {
    var str = site.replace(/(\r\n|\n|\r)/, ''),
        strs = str.split(','),
        url = Format.url(strs[0]),
        name = Format.normalizeStr(strs[1]);

    if (strs.length > 2) {
        console.log('WARN: ', strs);
    }

    if (!name) {
        name = (url.indexOf('mskobr') > -1) ?
            'Школа на сайте Департамента образования Москвы' :
            'Сайт школы';
    }

    return [name, url];
};

var parseSocial = function(social) {
    var str = social.replace(/(\r\n|\n|\r)/g, ''),
        strs = str.split(','),
        url = Format.url(strs[0]),
        name = Format.normalizeStr(strs[1]);

    if (strs.length > 2) {
        console.log('WARN: ', strs);
    }

    return [name, url];
};

var parseSpecialized = function(specialized) {
    specialized = specialized.split('\n');
    var result = [];
    for (var i = 0, l = specialized.length; i < l; i += 2) {
        result.push([
            specialized[i + 1],
            specialized[i].split(';').map(item => {
                return Format.normalizeStr(item, {
                    capitalize: true,
                    collapseSpaces: true
                });
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
        return Format.normalizeStr(item, {
            capitalize: true,
            collapseSpaces: true
        });
    });
};

var stringToBool = function(string) {
    if (string) {
        return string.trim() !== 'нет';
    } else {
        return false;
    }
};

var parseAddressOrArea = function(addresses) {
    if (addresses) {
        return addresses.split(';').map(adr => {
            if (adr) {
                return adr
                    .replace(/(\r\n|\n|\r)/g, '')
                    .replace('район', '')
                    .trim();
            }
        });
    }
};

var parseDepartments = function(departments) {
    return departments
        .replace(/\r/g, '')
        .split('\n')
        .map(department => {
            return department
                .split(':')
                .map(data => Format.normalizeStr(data, {
                    capitalize: true,
                    collapseSpaces: true
                }));
        })
        .filter(dep => {
            if (dep[0]) {
                return dep;
            }
        });
};

var extractDomain = function(url) {
    var domain;

    if (url.indexOf('://') > -1) {
        domain = url.split('/')[2];
    } else {
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
