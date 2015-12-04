goog.provide('sm.lDoc.nDemo.bBlockComment.Comment');

goog.require('sm.lSchool.bComment.Comment');
goog.require('goog.dom');

/**
 * Category Control documentation
 * @constructor
 */
sm.lDoc.nDemo.bBlockComment.Comment = function(){
    var params={
        'author': '����� ����',
        'rank': '������',
        'text': '��� ���� ����� ��������� � ����� 548 ���� ��������� �� ���������� �� 3 ����. ����� ������ ������� ������� ����� � �� ����� ��� �� ���� ����� �� ����� (������, ����, ������). ��� ����� �������: ���� �� �� ����� � 7 ���, �� ���, �� ������� ���������, ����� �������� �� 8 ��� � ����� �� ����� ��������. ������������, ������������ ����� ��� �������� ������������ �����, ������ ����� ��� �������� � ��� ���� ������� ���������� ����� ���-��-��',
        'sections': [
            {
                'name': '�����������',
                'rating': 3
            },
            {
                'name': '��������',
                'rating': 3
            },
            {
                'name': '���������',
                'rating': 2
            }
        ]
    };

    var elements = goog.dom.getElementsByClass(
        sm.lSchool.bComment.Comment.CssClass.ROOT
    );

    var comments;
    for (var i = 0, elem; elem = elements[i]; i++) {
        comments = new sm.lSchool.bComment.Comment();
        comments.decorate(elem);
    }
};

new sm.lDoc.nDemo.bBlockComment.Comment();
