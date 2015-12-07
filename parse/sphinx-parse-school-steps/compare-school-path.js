var xlsx = require('node-xlsx');
var fs = require('fs');

var path = {
    schoolBd: '../../tmp/schools.xlsx',
    sphinxData: './base/sphinx-data-school-steps.json',
    comparePath: './base/compare-school-path.json'
};

var ABBREVIATED_INDEX = 6;
var SITE_INDEX = 17;

function appendFile_(path, content) {
    fs.appendFileSync(path, content, 'utf8');
    console.log('The content is appended.');
}

function readFile_(path) {
    return fs.readFileSync(path, 'utf8');
}

function saveFile_(path, content) {
    fs.writeFileSync(path, content, 'utf8');
    console.log('The file is saved.');
}

// Get path list from Bd
function getBDSchoolPath_() {
    var parsed = xlsx.parse(path.schoolBd),
        dataBD = parsed[0].data,
        sitePath = dataBD.map(rowToPath_);
    return sitePath;
}

// Get school path from row
function rowToPath_(row) {
    var abbreviated = String(row[ABBREVIATED_INDEX]),
        site = String(row[SITE_INDEX]);
    return {
        abbreviated: abbreviated,
        site: site
    };
}

// Get path list from sphinx file
function getSiteSchoolPath_() {
    var sphinxData = JSON.parse(readFile_(path.sphinxData));
    return sphinxData.list;
}

// Compare path from Bd and sphinx file
function comparePath() {
    var pathBD = getBDSchoolPath_(),
        pathSphinx = getSiteSchoolPath_();
        saveFile_(path.comparePath, '');
    var result = [];

    for (var bd = 1; bd < pathBD.length; bd++) {
        var pathFromBD = pathBD[bd].site,
            abbreviatedBD = pathBD[bd].abbreviated;
        var data = {
                schoolAbbreviated: abbreviatedBD,
                schoolPathBD: pathFromBD,
                hasMskobrSite: false
            };

        for (var fl = 0; fl < pathSphinx.length; fl++) {
            var pathFromFile = pathSphinx[fl].website;
            if (pathFromBD === pathFromFile) {
                data.hasMskobrSite = true;
                data.mskobrSite = pathFromFile;
                break;
            }
        }
        result.push(data);
    }
    saveFile_(path.comparePath, JSON.stringify(result));
}

console.log('In processig...');
comparePath();