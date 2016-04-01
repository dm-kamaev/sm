var xlsx = require('node-xlsx');
var fs = require('fs');
var cheerio = require('cheerio');

var path = {
    listHtml: './base/html-data-from-site.json',
    parseHtml: './base/parse-html-data.json'
};

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

// Get html-data from file
function parseSites() {
    var sites = readFile_(path.listHtml).split(delimiter.EXTERNAL);
    var content = [];
    for (var i = 0; i < sites.length; i++) {
        console.log('Parsing', i);
        var site = sites[i];
        if (site.length > 0) {
            var data = parseSite_(site);
            content.push(data);
        }
    }
    saveFile_(path.parseHtml, JSON.stringify(content));
}

// Parse html
function parseSite_(page) {
    var siteData = page.split(delimiter.INTERNAL),
        sitePath = siteData[0],
        html = siteData[1];

    var $ = cheerio.load(html),
        stepTitlesList = $('#info-filials').children('.h3');

    var result = {
            sitePath: '',
            stepData: {
                preschool: {},
                elementary: {},
                middle_high: {},
                supplementary: {},
                higherEducation: {}
            }
        };

    if (stepTitlesList.length > 0 ) {
        result.sitePath = sitePath;
        for (var i = 0, step; i < stepTitlesList.length; i++) {
            var stepList = $('.col-md-6', $(stepTitlesList[i]).next());
            var title = $(stepTitlesList[i]).text();

            step = getStep(title);

            if (step !== '') {
                result.stepData[step].title = title;

                var addresses = $(stepList).map(function(i, el) {
                    var titleConvert = $(el).children('address').data('name');

                    if (titleConvert !== undefined) {
                        titleConvert = titleConvert.replace(/&quot*/ig, '"');
                        titleConvert = titleConvert.replace(/&nbsp*/ig, ' ');
                        titleConvert = titleConvert.replace(/<\/*[bB]>/ig, '');
                        titleConvert = titleConvert.replace(/Структурное  подразделение по адресу:/ig, '');
                    }
                        return {
                            title: titleConvert,
                            address: $(el).children('address').data('address')
                        }
                    }).get();

                result.stepData[step].addresses = addresses;
            }
        }
    }
    return result;
}

// Get step name from title
function getStep(title) {
    var result = '';
    if (title == 'Дошкольное образование') {
        result = 'preschool';
    }
    else if (title == 'Начальное образование') {
        result = 'elementary';
    }
    else if (title == 'Основное и среднее') {
        result = 'middle_high';
    }
    else if (title == 'Дополнительное образование') {
        result = 'supplementary';
    }
    else if (title == 'Профессиональное образование') {
        result = 'higherEducation';
    }
    return result;
}

console.log('In processing...');
parseSites();