var xlsx = require('node-xlsx');
var request = require('request');
var fs = require('fs');

var path = {
    schoolFromBd: '../../tmp/schools.xlsx',
    listHtml: './base/html-data-from-site.json',
    listHtml_error: './base/html-data-from-site-error.json'
};

var SITE_INDEX = 17;

var delimiter = {
    EXTERNAL: '#############',
    INTERNAL: '#^#^#^#^#^'
};

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

// Get list html from sites
function getHtmlData_(pathBd) {
    var parsed = xlsx.parse(pathBd),
        dataBD = parsed[0].data,
        sitePath = dataBD.map(getSiteData_);

        saveFile_(path.listHtml, '');
        saveFile_(path.listHtml_error, '');

    for (var i = 0; i < sitePath.length; i++) {
        if (sitePath[i].search('mskobr.ru') >= 0 ) {
            console.log('request to:', sitePath[i]);

            var sitesitePath = 'http://' + sitePath[i] + '/info_edu/structure_and_controls/';

            request(sitesitePath, function (error, response, body) {
                content = response.socket._host + delimiter.INTERNAL + body + delimiter.EXTERNAL;
                if (!error && response.statusCode == 200) {
                    appendFile_(path.listHtml, content);
                }
                else {
                    console.log('Error! ' + sitePath[i] + ' Detales: ');
                    console.log(error);
                    appendFile_(path.listHtml_error, sitePath[i] +
                        delimiter.INTERNAL + response.socket._host +
                        delimiter.EXTERNAL);
                }
            });
        }
    }
}

// Get schools path from BD
function getSiteData_(row) {
    var site = String(row[SITE_INDEX]);
    return site;
}


console.log('In processing...');
// Start process
getHtmlData_(path.schoolFromBd);
