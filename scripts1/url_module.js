var url = require('url')
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr,true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); // returns '/default.htm'
console.log(q.search);

var qdata = q.query; //returns an object: { year:2017, month:'Feburary'}
console.log(qdata.month); // returns 'Feburary'
