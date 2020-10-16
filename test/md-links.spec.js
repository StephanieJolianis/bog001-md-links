const mdLinks = require('../mdLinks');


const tobeFirstTest = [{ "file": "/home/stephanie/Documentos/proyectos laboratoria/bog001-md-links/test/directory1/prueba1.md", "href": "https://nodejs.org/es/", "text": "Node.js" }, { "file": "/home/stephanie/Documentos/proyectos laboratoria/bog001-md-links/test/directory1/prueba1.md", "href": "https://nodejs.org/es/", "text": "Node.js" }, { "file": "/home/stephanie/Documentos/proyectos laboratoria/bog001-md-links/test/directory1/prueba1.md", "href": "https://nodejs.org/es/", "text": "Node.js" }, { "file": "/home/stephanie/Documentos/proyectos laboratoria/bog001-md-links/test/hola.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown" }];

const tobeSecondTest = [{
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: '/home/stephanie/Documentos/proyectos laboratoria/bog001-md-links/test/directory1/prueba1.md',
        code: 200,
        status: 'OK'
    },
    {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: '/home/stephanie/Documentos/proyectos laboratoria/bog001-md-links/test/directory1/prueba1.md',
        code: 200,
        status: 'OK'
    },
    {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: '/home/stephanie/Documentos/proyectos laboratoria/bog001-md-links/test/directory1/prueba1.md',
        code: 200,
        status: 'OK'
    },
    {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: '/home/stephanie/Documentos/proyectos laboratoria/bog001-md-links/test/hola.md',
        code: 200,
        status: 'OK'
    }
];

const statsLinksTest4 = [];
statsLinksTest4.total = 4;
statsLinksTest4.unique = 1;

const statsLinksTest5 = [];
statsLinksTest5.total = 4;
statsLinksTest5.unique = 1;
statsLinksTest5.broken = 0;
statsLinksTest5.ok = 4;

describe('mdLinks', () => {

    test("Devuelve un arreglo de objetos con href, text y file", () => {
        expect.assertions(1);
        return expect(mdLinks.mdLinks("./test/", { validate: false, stats: false }))
            .resolves.toEqual(tobeFirstTest);
    });

    test("En caso de error, retorna error", () => {
        expect.assertions(1);
        return expect(mdLinks.mdLinks("./test/"))
            //.rejects.not.toBeNull();
            .rejects.toThrow();
    });


    test("En caso de --validate retorna code y status dentro del arreglo ", () => {
        expect.assertions(1);
        return expect(mdLinks.mdLinks("./test/", { validate: true, stats: false }))
            .resolves.toEqual(tobeSecondTest);
    });


    test("En caso de --stats retorna cantidad de links encontrados (total) y cantidad de links unicos (unique) ", () => {
        expect.assertions(1);
        return expect(mdLinks.mdLinks("./test/", { validate: false, stats: true }))
            .resolves.toEqual(statsLinksTest4)
    });


    test("En caso de --validate --stats retorna cantidad de links encontrados (total) cantidad de links unicos (unique) cantidad de links rotos (broken) cantidad de links funcionales(ok)", () => {
        expect.assertions(1);
        return expect(mdLinks.mdLinks("./test/", { validate: true, stats: true }))
            .resolves.toEqual(statsLinksTest5);
    });
});