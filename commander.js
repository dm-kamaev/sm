const commander = require('commander');

/*
 * Require Command objects from cli scripts here. No need to assign them to a variable.
 */

require('./console/metro.js').Command;
require('./console/parse.js').Command;
require('./console/parse_area.js').Command;
require('./console/department.js').Command;
require('./console/geocord.js').Command;
require('./console/vkapi.js').Command;
require('./console/dump.js').Command;
require('./console/egeData.js').Command;
require('./console/updateSearch.js').Command;
require('./console/getActs.js').Command;
require('./console/rating').Command;

/*
 * The line below initializes the interface on `node ./commander
 */

commander.parse(process.argv);
