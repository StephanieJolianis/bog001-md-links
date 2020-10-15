const { option } = require("yargs");
const reading = require("./reader.js");
const validate = require("./validate.js");

const mdLinks = (path, options) => new Promise((resolve, reject) => {
    return readerDirectory(path)
        .then(array => {
            if (options.validate == true) {
                array = validate.validateLink(array).then(arrValidate => {
                    if (options.stats == true) {
                        let statsLinks = [];
                        statsLinks.total = arrValidate.length;
                        statsLinks.unique = 0;
                        for (i = 0; i < arrValidate.length; i++) {
                            const result = arrValidate.filter(link => link.href == arrValidate[i].href).length;
                            if (result == 1)
                                statsLinks.unique++;
                        }
                        statsLinks.broken = arrValidate.filter(link => link.status == "FAIL").length;
                        statsLinks.ok = arrValidate.filter(link => link.status == "OK").length;
                        arrValidate = statsLinks;
                    }
                    return arrValidate;
                });
            }
            if (options.stats == true && options.validate == false) {
                let statsLinks = [];
                statsLinks.total = array.length;
                statsLinks.unique = 0;
                for (i = 0; i < array.length; i++) {
                    const result = array.filter(link => link.href == array[i].href).length;
                    if (result == 1)
                        statsLinks.unique++;
                }
                array = statsLinks;
            }

            resolve(array);
        })
        .catch(err => {
            reject(err);
        });
})



const readerDirectory = (path) => {
    let arrayLinks = [];
    return reading.readingDirectory(path)
        .then(array => {
            if (array) {
                arrayLinks = arrayLinks.concat(array);
            }
            return arrayLinks;
        })
        .catch(err => {
            return err;
        })
}




// mdLinks("./test/", { validate: true, stats: true }) // ejecución de la función
//     .then(cualquiercosa => {
//         console.log("Respuesta", cualquiercosa);
//     })
//     .catch(cualquiercosa => {
//         console.error(cualquiercosa);
//     })

exports.mdLinks = mdLinks;