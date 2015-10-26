goog.provide('sm.lDoc.nDemo.bBlockComment.Comment');

goog.require('sm.lSchool.bComment.Comment');
goog.require('goog.dom');

/**
 * Category Control documentation
 * @constructor
 */
sm.lDoc.nDemo.bBlockComment.Comment = function(){
    console.log('COMMENT DOC CONSTRUCTOR');
    var params={
        'author': 'Далай лама',
        'rank': 'ученик',
        'text': 'Для того чтобы поступить в школу 548 надо приходить на подготовку за 3 года. Тогда вашего ребенка возьмут точно и не важно как он себя ведет на уроке (кричит, воет, плачет). Еще такой вариант: если он не тянет в 7 лет, то его, по желанию родителей, могут оставить до 8 лет и тогда он точно поступит. Тестирования, проводящиеся якобы для проверки успеваемости детей, больше нужны для поднятия и без того большой самооценки школы тра-та-та',
        'sections': [
            {
                'name': 'Образование',
                'rating': 3
            },
            {
                'name': 'Педагоги',
                'rating': 3
            },
            {
                'name': 'Атмосфера',
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
