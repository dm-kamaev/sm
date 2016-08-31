var controller = {};

controller.search = function(req, res) {
    console.log('search released');
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end();
};

module.exports = controller;
