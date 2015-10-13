'use strict';

const path = require('path');
const express = require('express');
const soynode = require('soynode');

const app = express();

const CONFIG = {
    PORT: 3000
};

const LANDING_TEMPLATE = {
    template: 'bp.lSchool.Template.base',
    arghs: {
        params:{
            data:{
                schoolName: "Имя школы",
                schoolDescr: "Много много текста",
                directorName: "Имя директора",
                classes:"строка классов обучения",
                social:[
                    {name:"Твиттер", href:"#"},
                    {name:"Вконтакте", href:"#"},
                    {name:"Одноклассники", href:"#"},
                    {name:"Фейсбук", href:"#"}
                ],
                sites:[
                    {name:"Перейти на сайт школы", href:"#", link:"safasf.com"},
                    {name:"Страница образования на сайте гор москвы", href:"#", link:"safasf.com"}
                ],
                contacts:{
                    address:[
                        {title:"", description:"dsaggadgsadgas"},
                        {title:"asgasgdda", description:"dsaggadgsadsagdgas"},
                        {title:"sagasg", description:"dsaggadgsadasgaggas"}
                    ],
                    phones:[
                        {phone:"+7-909-673-96-55"},
                        {phone:"+8-909-673-96-56"}
                    ]
                }
            }
        }
    }
};
// soynode.setOptions({
//     allowDinamicRecompile: true
// });

const sendCompiledTemplate = (action, templateObj) =>
    soynode.loadCompiledTemplateFiles(path.join(__dirname + '/tmp/templates.js'), (err) =>
        err ? console.log('Compilation failed: ' + err) : action(soynode.render(templateObj.template, templateObj.arghs))
);


app.use(express.static(path.join(__dirname + '/public')));


app.get('/', (req, res) => {
    console.log('/');
    sendCompiledTemplate(res.send.bind(res), LANDING_TEMPLATE);
});

app.get('/search', (req, res) => {
    console.log('/search');
    // res.send(html);
});

app.get('/school/:id', (req, res) => {
    console.log('/school/' + req.params.id);
    // res.send(html);
});


app.listen(CONFIG.PORT, () => console.log('Running at port ' + CONFIG.PORT));
