const { argv } = require('yargs');
const project = require("./mdLinks.js");

if (argv._[0]) {
    const objArgv = {
        validate: false,
        stats: false
    }

    if (argv.validate) {
        objArgv.validate = true;
    }

    if (argv.stats) {
        objArgv.stats = true;
    }

    project.mdLinks(argv._[0], objArgv) // ejecución de la función
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        })
} else {
    console.error("Error: Se requiere ruta de archivo.");
}