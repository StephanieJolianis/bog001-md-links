// module.exports = () => {
//   // ...
// };

const project = require("./src/mdLinks.js");

project.mdLinks("./test/", { validate: true, stats: true }) // ejecución de la función
    .then(cualquiercosa => {
        console.log("Respuesta", cualquiercosa);
    })
    .catch(cualquiercosa => {
        console.error(cualquiercosa);
    })