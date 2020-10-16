const fs = require("fs").promises;
const mdPath = require("path");
const mdToHtml = require("./mdToHtml.js");

const readingDirectory = (path) => {
    return fs.stat(path)
        .then(stats => {
            if (stats.isDirectory()) {
                return fs.readdir(path)
                    .then(files => {
                        const arrayPromises = [];
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



const extnameFile = (path) => {
    return mdPath.extname(path);
}


const readingFile = (path) => {
    return fs.readFile(path, { encoding: "utf8" })
        .then(data => {
            return mdToHtml.converterFile(data, path);
        })
        .catch(
            (err) => {
                return err;
            });
}



exports.readingDirectory = readingDirectory;