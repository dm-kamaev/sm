goog.provide('sm.lDoc.nDemo.bBlockSchoolList.SchoolList');

goog.require('sm.lSchoolList.bSchoolList.SchoolList');
goog.require('goog.dom');

sm.lDoc.nDemo.bBlockSchoolList.SchoolList = function() {

    var elements = goog.dom.getElementsByClass(
        sm.lSchoolList.bSchoolList.SchoolList.CssClass.ROOT
    );

    var schoolList;
    for (var i = 0, elem; elem = elements[i]; i++) {
        schoolList = new sm.lSchoolList.bSchoolList.SchoolList();
        schoolList.decorate(elem);
    }
};


jQuery(function() {
    var doc = goog.dom.getElementByClass('l-doc');
    if (doc) {
        new sm.lDoc.nDemo.bBlockSchoolList.SchoolList();
    }
});
