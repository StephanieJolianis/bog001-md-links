# Markdown Links
<div align="center"> <img src="https://raw.githubusercontent.com/StephanieJolianis/bog001-md-links/mdLinks/img/links.png"></div>

**Índice**
- [Descripción](#id1)
- [Homepage](#id2)
- [Diagrama de flujo](#id3)
- [Instalación y uso (CLI)](#id4)
  - [Ejecución de comandos](#id6)
- [Instalación y uso (MÓDULO)](#id5)
- [Objetivos de aprendizaje](#id7)
- [Checklist](#id8)

## Descripción<div id='id1'/>
sj-mdlinks es una libreria que usa [Node.js](https://nodejs.org/) Contiene una función  `recursiva` que recibe como parámetro una ruta, localiza todos los archivos con extensión .md que esten dentro de la ruta proporcionada (incluyendo subdirectorios), verifica los links que contenga cada archivo, valida su status (ok, fail) y calcula estadisticas básicas sobre los links (totales, únicos y rotos).
***

## Homepage<div id='id2'/>
[Github StephanieJolianis](https://github.com/StephanieJolianis/bog001-md-links/tree/master)
***

## Diagrama de flujo<div id='id3'/>
<p align="center"> <img src="https://raw.githubusercontent.com/StephanieJolianis/bog001-md-links/mdLinks/img/diagrama.png" width="1000"></p>


***
## Instalación y uso (CLI)<div id='id4'/>

Linux o MacOS
```sh
$ sudo npm i -g sj-mdlinks
```

Microsoft Windows
```sh
$ npm i -g  sj-mdlinks
```
***
### Ejecución de comandos:<div id='id6'/>

Puedes ejecutar la aplicación de la siguiente manera a través de la terminal
md-links <path-to-file> [options]

##### Por ejemplo: 

- Para obtener links

Aquí puedes utilizar una ruta de un archivo con una extensión .md o una ruta de un directorio.

`Comando:`
```sh
$ mdlinks hola.md
```
`Retorno:` 
```sh
[ { file: '/home/stephanie/Escritorio/pruebas-mdlinks/hola.md',
    href: 'https://www.npmjs.com/package/sj-mdlinks',
    text: 'Stephanie' },
  { file: '/home/stephanie/Escritorio/pruebas-mdlinks/hola.md',
    href: 'https://otra-cosa.net/algun-doc.html',
    text: 'Link roto' } ]
```

- Options

##### `--validate`

Si pasas la opción `--validate`, el módulo hace una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces se considera el link como ok.

`Comando:`
```sh
$ mdlinks hola.md --validate
```
`Retorno:` 
```sh
[ { href: 'https://www.npmjs.com/package/sj-mdlinks',
    text: 'Stephanie',
    file: '/home/stephanie/Escritorio/pruebas-mdlinks/hola.md',
    code: 200,
    status: 'OK' },
  { href: 'https://otra-cosa.net/algun-doc.html',
    text: 'Link roto',
    file: '/home/stephanie/Escritorio/pruebas-mdlinks/hola.md',
    code: 404,
    status: 'FAIL' } ]
```


##### `--stats`
Si pasas la opción --stats el output será un texto con estadísticas básicas sobre los links.

`Comando:` 
```sh
$ mdlinks hola.md --stats
```
`Retorno:`

```sh
[ total: 2, unique: 2 ]
```

También puedes combinar --stats y --validate para obtener estadísticas que necesites de los resultados de la validación.

`Comando:` 
```sh
$ mdlinks hola.md --validate --stats
```
`Retorno:`

```sh
[ total: 2, unique: 2, broken: 1, ok: 1 ]
```
***
## Instalación y uso (MÓDULO)<div id='id5' />
Instalar como dependencia npm
```sh
$ npm i sj-mdlinks
```

#### Ejemplo uso del módulo

```js

const mdlinks = require("sj-mdlinks");

//obtener datos de un archivo .md [{ href, text, file }]
mdlinks("./some/example.md", { validate: false, stats: false})
  .then(links => {
    console.log(links)
  })
  .catch(console.error);

//Obtener links validados [{ href, text, file, status, ok }]
mdlinks("./some/example.md", { validate: true, stats: false })
  .then(links => {
    console.log(links)
  })
  .catch(console.error);

//Obtener estadísticas [{ total, unique }]
mdlinks("./some/example.md", { validate: false, stats: true })
  .then(links => {
    console.log(links)
  })
  .catch(console.error);

//Obtener estadísticas y validación de links [{ total, unique, broken, ok }]
mdlinks("./some/example.md", { validate: true, stats: true })
  .then(links => {
    console.log(links)
  })
  .catch(console.error);

```

## Objetivos de aprendizaje<div id='id7'/>

### JavaScript

* [ ] Uso de condicionales (if-else | switch | operador ternario)
* [ ] Uso de funciones (parámetros | argumentos | valor de retorno)
* [ ] Manipular arrays (filter | map | sort | reduce)
* [ ] Manipular objects (key | value)
* [ ] Uso ES modules ([`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
| [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export))
* [ ] Diferenciar entre expression y statements.
* [ ] Diferenciar entre tipos de datos atómicos y estructurados.
* [ ] [Uso de callbacks.](https://developer.mozilla.org/es/docs/Glossary/Callback_function)
* [ ] [Consumo de Promesas.](https://scotch.io/tutorials/javascript-promises-for-dummies#toc-consuming-promises)
* [ ] [Creación de Promesas.](https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/)

### Node

* [ ] Uso de sistema de archivos. ([fs](https://nodejs.org/api/fs.html), [path](https://nodejs.org/api/path.html))
* [ ] Instalar y usar módulos. ([npm](https://www.npmjs.com/))
* [ ] Creación de modules. [(CommonJS)](https://nodejs.org/docs/latest-v0.10.x/api/modules.html)
* [ ] [Configuración de package.json.](https://docs.npmjs.com/files/package.json)
* [ ] [Configuración de npm-scripts](https://docs.npmjs.com/misc/scripts)
* [ ] Uso de CLI (Command Line Interface - Interfaz de Línea de Comando)

### Testing

* [ ] [Testeo unitario.](https://jestjs.io/docs/es-ES/getting-started)
* [ ] [Testeo asíncrono.](https://jestjs.io/docs/es-ES/asynchronous)
* [ ] [Uso de librerias de Mock.](https://jestjs.io/docs/es-ES/manual-mocks)
* [ ] Uso de Mocks manuales.
* [ ] Testeo para múltiples Sistemas Operativos.

### Estructura del código y guía de estilo

* [ ] Organizar y dividir el código en módulos (Modularización)
* [ ] Uso de identificadores descriptivos (Nomenclatura | Semántica)
* [ ] Uso de linter (ESLINT)

### Git y GitHub

* [ ] Uso de comandos de git (add | commit | pull | status | push)
* [ ] Manejo de repositorios de GitHub (clone | fork | gh-pages)
* [ ] Colaboración en Github (branches | pull requests | |tags)
* [ ] Organización en Github (projects | issues | labels | milestones)

### HTTP

* [ ] Verbos HTTP ([http.get](https://nodejs.org/api/http.html#http_http_get_options_callback))

### Fundamentos de programación

* [ ] [Recursión.](https://www.youtube.com/watch?v=lPPgY3HLlhQ)


***


## Checklist<div id='id8'/>

### General

* [ ] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

* [ ] Un board con el backlog para la implementación de la librería.
* [ ] Documentación técnica de la librería.
* [ ] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

* [ ] El módulo exporta una función con la interfaz (API) esperada.
* [ ] Implementa soporte para archivo individual
* [ ] Implementa soporte para directorios
* [ ] Implementa `options.validate`

### CLI

* [ ] Expone ejecutable `md-links` en el path (configurado en `package.json`)
* [ ] Se ejecuta sin errores / output esperado
* [ ] Implementa `--validate`
* [ ] Implementa `--stats`

### Pruebas / tests

* [ ] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
  lines, y branches.
* [ ] Pasa tests (y linters) (`npm test`).
