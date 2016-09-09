var controller = {};

/**
 * Search controller.
 * Can send results for map on demand and for results list
 */
controller.search = function(req, res) {
    setTimeout(function() {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end();
    }, 10000);
};


/**
 * Search controller for map.
 * Send all results for request with params
 */
controller.searchMap = function(req, res) {
    setTimeout(function() {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end();
    }, 10000);
};

module.exports = controller;
