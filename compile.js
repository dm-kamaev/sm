/*eslint-disable */
'use strict';

const fs = require('fs');
const watch = require('node-watch');
const ts = require('typescript');
// console.log(ts); global.process.exit();
const PROJECT_PATH = '/home/gorod/l3_school-market/';
var TIME = 1000*60*60; // один час
// const TypeScriptSimple = require('typescript-simple').TypeScriptSimple;
// const compile_option = {
//   target: ts.ScriptTarget.ES2015,
//   module: ts.ModuleKind.CommonJS,
//   // moduleResolution: ts.ModuleResolutionKind.NodeJs,
//   // outDir: PROJECT_PATH,
//   rootDir: PROJECT_PATH,
//   // rootDir: '../../api/modules/',
//   noImplicitAny: true
// };
// console.log(ts.ModuleResolutionKind);
// console.log(compile_option);
// global.process.exit();

const filter = function(pattern, fn) {
  return function(filename) {
    if (pattern.test(filename)) {
      fn(filename);
    }
  }
};

const handler = function(filename) {
  console.log(filename, ' changed.');
};

// watch('/home/gorod/l3_school-market/', filter(/\.ts$/, handler));
// setTimeout(() => console.log('THE END'), TIME);

const file = fs.readFileSync(PROJECT_PATH+'api/modules/school/services/giaAdminService.ts', 'utf-8');

// VARIANT 1
// console.log(file);
// try {
//   const tss = new TypeScriptSimple(compile_option);
//   // var js = tss.compile(file);
//   var js = tss.compile(`
//     import {SchoolAdminController} from './api/modules/school/controllers/schoolAdminController'
//     const n: number = 1;
//   `);
//   // var js = tss.compile('const n: number = 1;');
//   // var js = tss.compile('var n: number = "str";', compile_option);
//   // var js = tss.compile(file, compile_option);
// } catch (e) {
//   console.error(e); // Error: L1: Type 'string' is not assignable to type 'number'.
// }
// console.log(js); // 'var n = 1;'

// VARIANT 2