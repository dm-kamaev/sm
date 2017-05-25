/* tslint:disable */

// const create_promise = function (i) {
//   return new Promise((rs, rj) => {
//     var j = i+'00';
//     setTimeout(function() {
//       console.log(j);
//       rs(j);
//     }, j);
//   });
// };

// interface PromiseConstructor {
//     queue(a: Function, b: any): Promise<any>;
// }
// Promise.queue = function (create_pormise, data) {
//   var start: any = Promise.resolve();
//   for (let i = 0, l = data.length; i < l; i++) {
//     start = start.then(function () {
//       return create_promise(data[i]);
//     });
//   }
//   start.catch(e=> console.log(e));
//   return start;
// };

// (async function () {
//     await Promise.queue(create_promise, [5,4,3,2]);
//     // var start: any = Promise.resolve();
//     // for (let i = 5; i > 0; i--) {
//     //   start = start.then(function () {
//     //     return p(i);
//     //   });
//     // }
//     // start.catch(e=> console.log(e));
//     // await start;
//     console.log('HERE');
// })();


