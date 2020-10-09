const fs = require("fs").promises;
const mdPath = require("path");
const converter = require("marked");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const http = require("https");

const readingDirectory = (path) => {
    return fs.stat(path)
        .then(stats => {
            if (stats.isDirectory()) {
                return fs.readdir(path)
                    .then(files => {
                        const arrayPromises = [];
                        //console.log(files);
                        for (let file of files) {
                            const routeFile = path + "/" + file;
                            let promiseReader = readingDirectory(routeFile).then(arrayFile => {
                                return arrayFile;
                            }).catch((err) => {
                                return err;
                            });
                            arrayPromises.push(promiseReader);
                        }
                        return Promise.all(arrayPromises).then(values => {
                            let arrayResponse = [];
                            for (let responsePromise of values) {
                                arrayResponse = arrayResponse.concat(responsePromise);
                            }
                            //console.log(arrayResponse);
                            return arrayResponse;
                        }).catch(err => {
                            return err;
                        });
                    })
                    .catch(
                        (err) => {
                            return err;
                        });
            } else {
                const validateExt = extnameFile(path);
                if (validateExt === ".md") {
                    return readingFile(path)
                        .then(linksFile => {
                            return linksFile;
                        })
                        .catch((err) => {
                            return err;
                        });
                } else {
                    return [];
                }
            }
        })
        .catch(err => {
            return err;
        });
}

const readingFile = (path) => {
    return fs.readFile(path, { encoding: "utf8" })
        .then(data => {
            const html = converter(data);
            const dom = new JSDOM(html);
            const domSelector = dom.window.document.querySelectorAll("a");
            let linksFile = [];
            for (let link of domSelector) {
                let pathDir = mdPath.resolve(path);
                const linkObj = {
                    file: pathDir,
                    href: link.href,
                    text: link.innerHTML
                }
                linksFile.push(linkObj);
            }
            return linksFile;
        })
        .catch(
            (err) => {
                return err;
            });
}


const extnameFile = (path) => {
    return mdPath.extname(path);
}


const mdLinks = (path, options) => new Promise((resolve, reject) => {
    return readerDirectory(path)
        .then(array => {
            //console.log("callback readerDirectory:", array);
            if (options.validate == true) {
                let arrayValidate = [];
                for (i = 0; i < array.length; i++) {
                    let objValidate = {
                        href: array[i].href,
                        text: array[i].text,
                        file: array[i].file,
                        code: 200,
                        status: "ok",
                    }
                    http.get(array[i].href, res => {
                        if (res.statusCode != 200) {
                            objValidate.code = res.statusCode;
                            objValidate.status = "fail";
                        }
                    });
                    arrayValidate.push(objValidate);
                }
                array = arrayValidate;
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
    //console.log(path);
    let arrayLinks = [];
    return readingDirectory(path)
        .then(array => {
            //console.log("callback readingDirectory:", array);
            if (array) {
                arrayLinks = arrayLinks.concat(array);
            }
            return arrayLinks;
        })
        .catch(err => {
            return err;
        })
}




mdLinks("./test/", { validate: true, stats: true }) // ejecución de la función
    .then(cualquiercosa => {
        console.log("Respuesta", cualquiercosa);
    })
    .catch(cualquiercosa => {
        console.error(cualquiercosa);
    })