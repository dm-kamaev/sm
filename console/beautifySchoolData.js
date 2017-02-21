var commander = require('commander');
var replace = require('tipograph').Replace;
const languages = require('tipograph').Languages;
var services = require.main.require('./app/components/services').all;
var async = require('asyncawait/async');
var await = require('asyncawait/await');

var beautify = async(function() {
    replace.configure(languages.russian);

    var schools = await(services.school.listInstances()),
        updatedCount = 0;

    await(schools.forEach(school => {
        if (updateSchool(school)) {
            updatedCount++;
        }
    }));
    console.log(updatedCount + ' schools were updated.');
});

var updateSchool = function(school) {
    var description = school.description,
        features = school.features,
        data = {},
        isUpdated = false;

    if (description) {
        data.description = replace.all(
            fixQutoesAndEscape(description)
        );
    }

    if (features) {
        data.features = features.map(feature => {
            return replace.all(
                fixQutoesAndEscape(feature)
            );
        });
    }

    if (Object.keys(data).length) {
        isUpdated = true;
        school.update(data);
    }
    return isUpdated;
};

var fixQutoesAndEscape = function(string) {
    return string
        .replace(/[«»]/g, '"')
        .replace('\n', '')
        .replace(/"([^"]*)"/g, '«$1»');
};

commander
    .command('beautify')
    .description('Beautifies schools description and features')
    .action(() => beautify());

exports.Command;
