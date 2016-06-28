exports.view = function(req, res) {
    res.render('requestList.html');
};

exports.getData = function(req, res) {
    var json = require( // eslint-disable-line global-require
        '../../../../doc/api_data.json'
    ) || {};
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(json));
};
