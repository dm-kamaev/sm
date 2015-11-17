var soy = require.main.require('./app/components/soy');

var docPages = [
        "b-mark",
        "b-stars",
        "b-comments",
        "b-rating",
        "b-feedback-modal",
        "b-school-list"
    ];


exports.list = function(req, res) {
    res.header("Content-Type", "text/html; charset=utf-8");
    res.end(
        soy.render('sm.lDoc.Template.index', {list: docPages})
    );
};


exports.view = function(req, res) {
    res.header("Content-Type", "text/html; charset=utf-8");
    res.end(
        soy.render('sm.lDoc.Template.item', {
            list: docPages,
            name: req.params.id
        })
    );
};
