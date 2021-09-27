# locgent

Tool what generates html templates from localization json files.

Script don't have any error handlers so you should follow the instructions below:

**Installing**
```npm
npm install locgent
```

**Project structure**
- src
  - email-name
    - localizations
      - en.json
      - es.json
      - etc...
    - examples
      - src.html

src.html must containt an html code with variables.

**Variable format**
```json
{var_name}
```

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


