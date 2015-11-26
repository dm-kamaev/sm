goog.provide('sm.lDoc.nDemo.bBlockComments.Comments');

goog.require('sm.lSchool.bComments.Comments');
goog.require('goog.dom');

sm.lDoc.nDemo.bBlockComments.Comments = function() {

    var elements = goog.dom.getElementsByClass(
        sm.lSchool.bComments.Comments.CssClass.ROOT
    );

    var comments;
    for (var i = 0, elem; elem = elements[i]; i++) {
        comments = new sm.lSchool.bComments.Comments();
        comments.decorate(elem);
        comments.addComment({
            author: 'Елена 321',
            rank: 'родитель',
            text: 'Если ваш ребенок не силен в самостоятельном образовании, смело идите в эту школу, фраза "Быть тебе дворником" будет преследовать его все года обучения. Хотелось бы спросить преподавательский состав: "Если вы не любите детей и свою профессию, может быть профессия дворника вам как-то ближе?"',
            sections:[
                {
                    name: 'Образование',
                    rating: 3
                },
                {
                    name: 'Педагоги',
                    rating: 4
                },
                {
                    name: 'Инфраструктура',
                    'rating': 2
                },
                {
                    name: 'Атмосфера',
                    rating: 2
                }
            ]
        });
        comments.addComment({
            author: 'Елена 321',
            rank: 'родитель',
            text: 'Если ваш ребенок не силен в самостоятельном образовании, смело идите в эту школу, фраза "Быть тебе дворником" будет преследовать его все года обучения. Хотелось бы спросить преподавательский состав: "Если вы не любите детей и свою профессию, может быть профессия дворника вам как-то ближе?"',
            sections:[
                {
                    name: 'Образование',
                    rating: 3
                },
                {
                    name: 'Педагоги',
                    rating: 4
                },
                {
                    name: 'Инфраструктура',
                    'rating': 2
                },
                {
                    name: 'Атмосфера',
                    rating: 2
                }
            ]
        });
    }
};


jQuery(function() {
    var doc = goog.dom.getElementByClass('l-doc');
    if (doc) {
        new sm.lDoc.nDemo.bBlockComments.Comments();
    }
});
