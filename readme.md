# npm-keyword [![Build Status](https://travis-ci.org/sindresorhus/npm-keyword.svg?branch=master)](https://travis-ci.org/sindresorhus/npm-keyword)

> Get a list of npm packages with a certain keyword


## Install

```
$ npm install --save npm-keyword
```


## Usage

```js
var npmKeyword = require('npm-keyword');

npmKeyword('gulpplugin', function (err, packages) {
	console.log(packages);
	//=> [{name: 'gulp-autoprefixer', description: '...'}, ...]
});
```


## API

### npmKeyword(keyword, callback)

Get a list of packages having the specified keyword in their package.json `keyword` property.

### npmKeyword.url(keyword)

Get the url used for fetching the list from the npm registry. You usually won't need this.

#### keyword

*Required*  
Type: `string`

#### callback(error, packages)

*Required*  
Type: `function`


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
