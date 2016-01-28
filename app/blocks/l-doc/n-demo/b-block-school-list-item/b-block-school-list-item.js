goog.provide('sm.lDoc.nDemo.bBlockSchoolListItem.SchoolListItem');

goog.require('sm.lSearchResult.bSchoolListItem.SchoolListItem');
goog.require('goog.dom');

sm.lDoc.nDemo.bBlockSchoolListItem.SchoolListItem = function() {

    var elements = goog.dom.getElementsByClass(
        sm.lSearchResult.bSchoolListItem.SchoolListItem.CssClass.ROOT
    );

    var schoolListItem;
    for (var i = 0, elem; elem = elements[i]; i++) {
        schoolListItem = new sm.lSearchResult.bSchoolListItem.SchoolListItem({
            'id': 10,
            'score': [
                {'name': 'Образование', 'value': 2.3},
                {'name': 'Преподаватели', 'value': 2.7},
                {'name': 'Инфраструктура', 'value': 3.5},
                {'name': 'Атмосфера', 'value': 4}
            ],
            'totalScore': 4
        });
        schoolListItem.decorate(elem);
    }
};
