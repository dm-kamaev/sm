const commander = require('commander');

/*
 * Require Command objects from cli scripts here. No need to assign them to a variable.
 */

require('./console/geocord.js').Command;
require('./console/parse.js').Command;
require('./console/department-parse.js').Command;

/*
 * The line below initializes the interface on `node ./commander`
 */

commander.parse(process.argv);
