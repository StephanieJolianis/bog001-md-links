#!/usr/bin/env node

const chalk = require('chalk');
const { argv } = require('yargs');
const project = require("./mdLinks.js");

const mdlinksFunction = (argv) => {
    if (argv._[0]) {
        const options = {
            validate: false,
            stats: false
        }

        if (argv.validate) {
            options.validate = true;
        }

        if (argv.stats) {
            options.stats = true;
        }

        project.mdLinks(argv._[0], options) // ejecución de la función
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(chalk.red(error));
            })
    } else {
        console.error(chalk.bold.red("Error: Se requiere ruta de archivo."));
    }
}

mdlinksFunction(argv);

exports.mdlinksFunction = mdlinksFunction;