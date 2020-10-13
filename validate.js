const http = require("https");

const validateLink = (array) => {
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
    return arrayValidate;
}

exports.validateLink = validateLink;