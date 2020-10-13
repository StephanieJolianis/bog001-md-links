const reading = require("./reader.js");
const validate = require("./validate.js");

const mdLinks = (path, options) => new Promise((resolve, reject) => {
    return readerDirectory(path)
        .then(array => {
            if (options.validate == true) {
                array = validate.validateLink(array);
            }
            if (options.stats == true) {
                let statsLinks = [];
                statsLinks.total = array.length;
                statsLinks.unique = 0;
                for (i = 0; i < array.length; i++) {
                    const result = array.filter(link => link.href == array[i].href).length;
                    if (result == 1)
                        statsLinks.unique++;
                }
                if (options.validate == true) {
                    statsLinks.broken = array.filter(link => link.status == "fail").length;
                    statsLinks.ok = array.filter(link => link.status == "ok").length;
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