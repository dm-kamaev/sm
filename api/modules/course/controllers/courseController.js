var controller = {};

controller.search = function(req, res) {
    setTimeout(function() {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end();
    }, 10000);
};

module.exports = controller;
