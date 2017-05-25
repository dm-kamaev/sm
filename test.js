/*eslint-disable */
const lodash = require('lodash');
// var users = [
//   { 'user': 'fred',   'age': 48 },
//   { 'user': 'barney', 'age': 36 },
//   { 'user': 'fred',   'age': 40 },
//   { 'user': 'barney', 'age': 34 }
// ];
var data = [{
  relatedProgramId: 12,
  budgetPlaces: 90,
  competition: 12.2,
  totalScore: 4.5
}, {
  relatedProgramId: 14,
  budgetPlaces: 60,
  competition: 2.25,
  totalScore: 4.5
}, {
  relatedProgramId: 15,
  budgetPlaces: 13,
  competition: 0,
  totalScore: 3
}, {
  relatedProgramId: 16,
  budgetPlaces: 10,
  competition: 15.6,
  totalScore: 3
}, {
  relatedProgramId: 18,
  budgetPlaces: 15,
  competition: 54,
  totalScore: 2.5
}];
// console.log(lodash.orderBy(data, ['totalScore', 'budgetPlaces', 'competition'], ['desc', 'desc', 'desc']));
// console.log(lodash.sortBy(users, ['age', 'age']));
// console.log();
// console.log(lodash.orderBy(users, ['age', 'age'], ['desc', 'desc']));

// console.log(compareArr([2,3,1], [1,2,3]));
// console.log(compareArr([], []));
function compareArr(arr1, arr2) {
  var hash = {};
  if (arr1.length !== arr2.length) {
    return false;
  }
  var res = true;
  arr1.forEach((el) => { hash[el] = true;});
  for (var i = 0, l = arr2.length; i < l; i++) {
    if (!hash[arr2[i]]) {
      res = false;
      break;
    }
  }
  return res;
}

// console.log(lodash.identity());
// console.log('|' + test('$%^&*!@  >/Мо<с__Кв??а; fgdfgdfg ') + '|');
// console.log('|' + test('$%^&*!@  >/Мо<с__Кв??а; fgdfgdfg ') + '|');

// function test(cityName) {
//   return cityName.toLowerCase()
//     .replace(/[\w\d_!@\$%^&*\(\)"':;|,\.\+<>?\[\]~{}\/\\]+/g, '')
//     .trim()
//     .replace(/\s+/g, ' ');

// }

// const fs = require('fs');
// const Csv = require('csvtojson').Converter;
// var converter = new Csv({
//   noheader: false,
//   headers: ['id', 'name', 'abbreviation', 'description', 'image_url', 'links', 'military_department', 'dormitory', 'city_id', 'created_at', 'updated_at', 'relap_image_url']
// });
// converter.fromFile(
//   '/home/gorod/l3_school-market/assets/universities/university.csv',
//   function(err, result) {
//     if (err) {
//       return console.log('Error', err);
//     }
//     console.log(result[1]);
//   });
// .from(fs.readFileSync())
//   .on('csv', (csvRow) => { // this func will be called 3 times
//     console.log(csvRow) // => [1,2,3] , [4,5,6]  , [7,8,9]
//   })
//   .on('done', () => {
//     //parsing finished
//   })

// console.log(lodash.uniq(['2', '1', '2']));


// var xlsxj = require("xlsx-to-json");

// xlsxj({
//   input: '/home/gorod/l3_school-market/assets/universities/list_program.xlsx',
//   output: null,
// }, function(err, res) {
//   console.log(err || res);
// });
// console.log('@@! Hello-@@@worl---d@ test'.replace(/[\s!-/:-@[-`{-~]/g, ''));

// console.log('e'.replace('\u0065', '\u0066'));
// console.log('й'.charCodeAt(0).toString(16));
// console.log('й'.charCodeAt(1).toString(16));
// console.log('\u0438\u0306' === 'й');
// console.log('й'.charCodeAt(0), 'й'.charCodeAt(1)); // in db
// console.log('й'.charCodeAt(0));
// console.log('й'.charCodeAt(0));
// var s = 'Технологии легкой промышленности'.replace(/й/g, 'й');
// var s = 'Технологии легкой промышленности'.replace(/\u0438\u0306/g, 'й');
// var s = 'Технологии легкой промышленности';
// console.log('Технологии легкой промышленности' === s);

// ege
// var ar = [
//   // '"ЕГЭМатематика-27Обществознание-42Русский язык-36 1 вариант  ЕГЭМатематика-от27Обществознание-от42Русский язык-от36"',
//   // '"ЕГЭМатематика-27Обществознание-42Русский язык-36 1 вариант  ЕГЭМатематика-от27Обществознание-от42Русский язык-от36"',
//   '"ЕГЭЛитература-32Русский язык-36 1 вариант   ЕГЭЛитература-32Русский язык-36 1 вариантЕГЭЛитература-от32Русский язык-от36"',
//   'ЕГЭМатематика-от27Информатика и ИКТ-от40Русский язык-от36 2 варианта    \r\n\r\n    \r\n        ЕГЭМатематика-от27Информатика и ИКТ-от40Русский язык-от36'
// ];

// for (var i = 0, l = ar.length; i < l; i++) {
//   var el = ar[i];
//   el = el.replace(/[\'\"]/g, '').trim();
//   el = el.replace(/\s+/g, ' ');
//   el = el.replace(/\d+ вариант.+/g, '');
//   el = el.replace(/^ЕГЭ/g, '');
//   // console.log();
//   console.log(el);
//   // console.log(el.split(/-[а-я]*\d+/));
//   console.log(el.split(/-[а-я]*\d+/).filter(subject => subject.trim()));
// }

// exam
// var extra_exam = [
//   // 'Экзамены в вузеТворческое испытание-65',
//   // 'Экзамены в вузеТворческое испытание-65',
//   // 'Экзамены в вузеПрофессиональное испытание-от70Творческое испытание-от70',
//   // 'Экзамены в вузеПо специальности-40',
//   // 'Экзамены в вузеРисунок, живопись и композиция-от60',
//   // 'Экзамены в вузеСобеседованиеПрофессиональное испытание-50Мастерство актера-50',
//   'Экзамены в вузеСобеседованиеПрофессиональное испытание-0Творческое испытание-0',
// ];
// for (var i = 0, l = extra_exam.length; i < l; i++) {
//   var exams = extra_exam[i];
//   exams = exams.replace(/[\'\"]/g, '');
//   exams = exams.replace(/\s+/g, ' ').trim();
//   exams = exams.replace(/^Экзамены в вузе/g, '');
//   // console.log();
//   console.log(exams);
//   var res = exams.split(/-[а-я]*\d+/).filter(subject => subject.trim());
//   var new_res = [];
//   res.forEach(function (el) {
//     // var m = 'СобеседованиеТворческое испытание'.match(/(.+)([А-Я])(.+)/);
//     var m = el.match(/(.+)([А-Я])(.+)/);
//     if (m && m[1] && m[2] && m[3]) {
//       new_res.push(m[1]);
//       new_res.push(m[2].toUpperCase()+m[3]);
//       // console.log(m[1]+ ' '+m[2].toLowerCase()+m[3]);
//     } else {
//       new_res.push(el);
//     }
//     // var res = el.split('П');
//     // if (res.length > 1) {
//     //   // console.log(res);
//     //   new_res.push(res[0]);
//     //   new_res.push('П'+res[1]);
//     //   // new_res = new_res.concat(res);
//     // } else {
//     //   new_res.push(el);
//     // }
//   });
//   console.log(new_res);
// }

function parseEge(str) {
  str = str.replace(/\s+/g, ' ')
      .trim()
      .replace(/[\'\"]/g, '')

  const [subjects] = str.split(':');
  return subjects.split(',');
}
// not rigth
// Cанкт-Петербург

// right
// Санкт-Петербург

function transform(cityName) {
  return cityName
            .toString()
            .replace(/[\w\d_!@#\$%^&*\(\)"':;|,\.\+<>?\[\]~{}\/\\]+/g, '')
            .replace(/-+/g, '-')
            .replace(/^-+/g, '')
            .replace(/-+$/g, '')
            .trim()
            .replace(/\s+/g, ' ')
            // latin "C" to russian "С"
            // .replace(/^C/, 'С');
}

// console.log(transform('Cанкт-Петербург'));
// console.log(transform('Cанкт-Петербург') === 'Санкт-Петербург');

// console.log(parse('Обществознание, Иностранный язык, Русский язык: 43, 24, 40'));

// console.log(getCompetition('18266'));
function getCompetition(str) {
  var number = float(str);
  if (number > 1000) {
    var str_num = number.toString();
    return Number(str_num.replace(/^(\d{2})/, '$1.'));
  } else {
    return number;
  }
}

function float(str) {
  if (typeof str === 'string') {
      str = str.replace(/\,/g, '.');
  }
  const res = parseFloat(str);
  if (isNaN(res)) {
      return 0;
  }
  return res;
}


function parse2(str) {
  str = str.replace(/\s+/g, ' ').trim();
  const [subjects] = str.split(':');
  return subjects.replace(/,\s+\d+,.+/, '')
                 .split(',')
                 .filter(el => Boolean(el));
}
// console.log(parse2(''));
// console.log(parse2('Математика, Физика, Русский язык: 27, 36, 36'));
// console.log(parse2('История, Иностранный язык, Русский язык, 32, 22, 36'));
// var data = [
//     { rel: 'link1', href: 'url1'},
//     { rel: 'link2', href: 'url2'},
//     { rel: 'link3', href: 'url3'},
//     { rel: 'link4', href: 'url4'},
// ];
// console.log(lodash.keyBy(data, 'rel'));
// console.log(lodash.mapValues(lodash.keyBy(data, 'rel'), v => v.href));

console.log(
  'Российский университет дружбы народов (РУДН asdadsa)'.replace(/\([\s\S]+\)$/, '')
);
