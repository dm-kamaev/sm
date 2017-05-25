/*eslint-disable */
// var obj ={
// "ONE_WEEK": 0,
// "TWO_WEEKS": 1,
// "MORE_TWO_WEEKS": 2
// };



generatedObj([
{
"programMajorName": "Информатика и вычислительная техника",
"programs":[
{
"name": "Вычислительные машины, комплексы, системы и сети",
"programAlias": "vychislitelnye-mashiny%2C-kompleksy%2C-sistemy-i-seti",
"universityAlias": "nacionalnyj-issledovatelskij-universitet-%22mei%22"
},
{
"name": "Автоматизированные системы обработки информации и управления",
"programAlias": "avtomatizirovannye-sistemy-obrabotki-informacii-i-upravlenija",
"universityAlias": "nacionalnyj-issledovatelskij-universitet-%22mei%22"
},
{
"name": "Прикладная информатика в экономике",
"programAlias": "prikladnaja-informatika-v-ekonomike",
"universityAlias": "nacionalnyj-issledovatelskij-universitet-%22mei%22"
}
]
}]);

function generatedObj(obj) {
    var res = JSON.stringify(obj, null, 4);
    var lines = res.split('\n');
    lines = lines.map(function(line) {
        return '*\t' + line;
    }).join('\n');
    console.log(lines);
}

