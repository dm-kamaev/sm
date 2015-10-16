'use strict';

const path = require('path');
const express = require('express');
const soynode = require('soynode');

var db = require('./app/components/db');
var soy = require('./app/components/soy');
var modules = require('./app/modules');

const app = express();

const CONFIG = {
    PORT: 3000
};

const LANDING_TEMPLATE = {
    template: 'sm.lSchool.Template.base',
    arghs: {
        params:{
            data:{
                schoolName: "Имя школы",
                schoolDescr: "Много много текста Много много текста Много много текста Много много текста Много много текста Много много текста Много много текста",
                directorName: "Имя директора",
                schoolQuote : "Мел",
                classes:"строка классов обучения",
                social:[
                    {name:"Твиттер", href:"#"},
                    {name:"Вконтакте", href:"#"},
                    {name:"Одноклассники", href:"#"},
                    {name:"Фейсбук", href:"#"}
                ],
                sites:[
                    {name:"Перейти на сайт школы", href:"#", link:"safasf.com"},
                    {name:"Страница образования на сайте города москвы текст текст текст", href:"#", link:"safasf.com"}
                ],
                contacts:{
                    address:[
                        {title:"", description:"dsaggadgsadgas"},
                        {title:"asgasgdda", description:"dsaggadgsadsagdgas"},
                        {title:"sagasg", description:"dsaggadgsadasgaggas"}
                    ],
                    phones:[
                        "+7-909-673-96-55",
                        "+8-909-673-96-56"
                    ]
                }
            }
        }
    }
};

const DOC_TEMPLATE = {
    template: 'sm.lDoc.Template.index',
    arghs: {
        list:[
            "b-mark"
        ]
    }
};



const sendCompiledTemplate = (action, templateObj) =>
    soynode.loadCompiledTemplateFiles(path.join(__dirname + '/tmp/templates.js'), (err) =>
        err ? console.log('Compilation failed: ' + err) : action(soynode.render(templateObj.template, templateObj.arghs))
);


app.use(express.static(path.join(__dirname + '/public')));


app.get('/doc', (req, res) => {
    console.log('/doc: '+JSON.stringify(DOC_TEMPLATE));
    sendCompiledTemplate(res.end.bind(res), DOC_TEMPLATE);
});

app.get('/doc/:id', (req, res) => {
    var doc_item_template = JSON.parse(JSON.stringify(DOC_TEMPLATE));
    doc_item_template.template = 'sm.lDoc.Template.item';
    doc_item_template.arghs.name = req.params.id;
    console.log('/doctest/' + req.params.id);
    sendCompiledTemplate(res.end.bind(res), doc_item_template);
    // res.send(html);
});

app.get('/search', (req, res) => {
    console.log('/search');
    // res.send(html);
});

app.use('/', modules.school.router);


soy.init(__dirname, function() {
    db.sync().then(function() {
        app.listen(CONFIG.PORT, function() {
            console.log('Running at port ' + CONFIG.PORT)
        });
    });
});
