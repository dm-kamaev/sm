goog.provide('sm.lDoc.nDemo.bBlockSchoolList.SchoolList');

goog.require('sm.lSearchResult.bSchoolList.SchoolList');
goog.require('goog.dom');

sm.lDoc.nDemo.bBlockSchoolList.SchoolList = function() {

    var elements = goog.dom.getElementsByClass(
        sm.lSearchResult.bSchoolList.SchoolList.CssClass.ROOT
    );

    var schoolList;
    for (var i = 0, elem; elem = elements[i]; i++) {
        schoolList = new sm.lSearchResult.bSchoolList.SchoolList();
        schoolList.decorate(elem);
    }
};
