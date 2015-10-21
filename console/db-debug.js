var modules = require.main.require('./app/modules');
console.log('models loaded: ')
var school = modules.school.models.School,
//    cg = modules.commentGroup.models.commentGroup,
    comment = modules.Comment;

//console.log(modules);

var commentController = require.main.require('./app/modules/comment/controllers/commentController');


 school.findOne({ where: {id: 12} }).then( tst => {
     commentController.createComment(tst,"test comment");
 });
