const fetch = require("node-fetch");

const validateLink = (array) => {
    let arrayValidate = [];
    for (i = 0; i < array.length; i++) {
        let objValidate = {
            href: array[i].href,
            text: array[i].text,
            file: array[i].file,
            code: 200,
            status: "OK",
        }
        objValidate = responseLink(objValidate);
        arrayValidate.push(objValidate);
    }
    return Promise.all(arrayValidate).then(values => {
        let arrayResponse = [];
        for (let responsePromise of values) {
            arrayResponse = arrayResponse.concat(responsePromise);
        }
        return arrayResponse;
    }).catch(err => {
        return err;
    });
}

const responseLink = link => {
    return fetch(link)
        .then(res => {
            link.code = res.status;
            link.status = res.statusText;
            return link;
        }).catch(res => {
            link.code = 404;
            link.status = "FAIL";
            return link;
        });
}
exports.validateLink = validateLink;