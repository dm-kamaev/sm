const fs = require('fs');

exports.view = function(req, res) {
    res.render('requestList.html');
};

exports.getData = function(req, res) {
    // var json = require('../../../../doc/api_data.json') || {};
    var json = JSON.parse(
        fs.readFileSync('../../../../doc/api_data.json', 'utf8')
    ) || {};
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(json));
};
