# locgent

locgent is a script what generates html templates from localization JSON files.
src folder has an example to test script.

**Installing**
```npm
npm install locgent
```

## Instructions

The script is very stupid and it works only if you follow the instructions below:

**Project structure**
- src
  - email-name
    - localizations
      - en.json
      - es.json
      - etc...
    - examples
      - src.html

- src.html must contain an HTML code with variables. examples folder must contain a localization folder with localization files.

**Variable format**
```json
[var_name]
```

The script doesn't work with nested JSON parameters for now.

**src.html content example**

```html
<div>
  <h1>{header_var}</h1>
  <p>{paragraph_var}</p>
</div>
```

**Package.json script**
```json
"script_name": "node node_modules/locgent/locgent.js"
```


