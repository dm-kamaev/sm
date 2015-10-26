const commander = require('commander');

/*
 * Require Command objects from cli scripts here. No need to assign them to a variable.
 */

require('./console/parse.js');
require('./console/geocord.js');

/*
 * The line below initializes the interface on `node ./commander`
 */

commander.parse(process.argv);
