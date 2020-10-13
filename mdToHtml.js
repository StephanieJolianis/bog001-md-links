const converter = require("marked");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const mdPath = require("path");

const converterFile = (file, path) => {
    const html = converter(file);
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
}


exports.converterFile = converterFile;