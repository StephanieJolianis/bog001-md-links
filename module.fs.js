const fs = require("fs").promises;
const mdPath = require("path");
const converter = require("marked");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
//const http = require("http");

// fs.readFile("README.md", { encoding: "utf8" }, (err, data) => {
//     if (err) {
//         console.log(`Error: ${err}`);
//     } else {
//         console.log("Datos leídos:");
//         console.log(data);
//     }
// })

const readingDirectory = (path) => {
    return fs.readdir(path)
        .then(
            (files) => {
                console.log(files);
                for (let file of files) {
                    const routFile = path + "/" + file
                    validateDirectory(routFile);
                }
            })
        .catch(
            (err) => {
                return err;
            });
}

const readingFile = (path) => {
    return fs.readFile(path, { encoding: "utf8" })
        .then(
            (data) => {
                const html = converter(data);
                const dom = new JSDOM(html);
                const domSelector = dom.window.document.querySelectorAll("a");
                //for (i = 0; i < html.length; i++) {
                for (let link of domSelector) {
                    console.log(link.innerHTML);
                    console.log(link.href);
                }
                //console.log(dom.window.document.querySelector("a").href)
                // }
            })
        .catch(
            (err) => {
                console.log(err);
            });
}

const extnameFile = (path) => {
    return mdPath.extname(path);
}


const validateDirectory = (path) => {
    return fs.stat(path)
        .then(stats => {
            if (stats.isDirectory()) {
                readingDirectory(path);
            } else {
                const validateExt = extnameFile(path);
                if (validateExt === ".md") {
                    readingFile(path)
                }
            }
        })
        .catch(err => {
            return err;
        });
}

validateDirectory("./test/")
    .then(console.log)
    .catch(console.error)