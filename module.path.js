const path = require("path");

//let pathObj = path.parse("README.md");
let pathObj = path.extname(__filename);
console.log(pathObj);
// console.log(pathObj.ext);