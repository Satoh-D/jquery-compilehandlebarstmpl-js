jquery-compilehandlebarstmpl-js
===============================

__"jQuery CompileHandlebarsTmpl.js" is a jQuery Plugin to use easily "Handlebars.js"__

## Demo

- [Demo Page(Basic)](https://dl.dropboxusercontent.com/u/21601359/140611_compilehandlebarsjs/test01.html)
- [Demo Page(Add RegisterHelper)](https://dl.dropboxusercontent.com/u/21601359/140611_compilehandlebarsjs/test02.html)

## Usage

```html
<head>
<script src="jquery.js"></script>
<script src="jquery.compilehandlebars.js"></script>
<script>
$(function() {
	$('.js-compile').compilehandlebarstmpl({
		jsonURL: 'test.json',
		getDataType: 'json',
		tmplSrc: '#tmpl'
	});
});
</script>
</head>
<body>

<div class="js-compile"></div>

<script type="text/x-handlebars-template" id="">
{{#each this}}
<div>{{Hoge}}</div>
{{/each}}
</script>

</body>
```

## Options

- `jsonURL`[string]: URL of JSON
- `tmplSrc`[string]: ID of Templte element
- `getDataType`[string]: Datatype of JSON ('json' or 'jsonp')
- `getDataOpts`[object]: The data that used at $.ajax()
- `helpers`[array]: Helpers(Handlebarsjs)

## Depends

- [Handlebars.js](http://handlebarsjs.com/)
- jQuery.js

## Browser Support

- IE6+
- Google Chrome(win/mac)
- Firefox(win/mac)
- Safari(win)

## License

MIT License.

## Copyright

©Sato Daiki. ([@Satoh_D](https://twitter.com/Satoh_D))
