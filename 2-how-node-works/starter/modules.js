// console.log(arguments);
// console.log(require("module").wrapper);



// module exports
const C = require("./test-modules.js");
const calc1 = new C();
console.log(calc1.multiply(5, 2));

//exports
// const calc2 = require('./test-module-2.js');
// console.log(calc2.multiply(5, 3));

const { add, multiply, divide } = require('./test-module-2.js');
console.log(multiply(4, 3));

//caching
require('./test-module-3.js')();
require('./test-module-3.js')();
require('./test-module-3.js')();
require('./test-module-3.js')();
require('./test-module-3.js')();
